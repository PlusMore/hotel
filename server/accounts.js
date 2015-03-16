Accounts.emailTemplates.siteName = "PlusMore";
Accounts.emailTemplates.from = "PlusMore <noreply@plusmoretablets.com>";
Accounts.emailTemplates.enrollAccount.subject = function(user) {
  return "Welcome to PlusMore, " + user.profile.firstName + "!";
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
  var spliturl = url.split('/#');

  var appUrl = Meteor.settings.apps.hotel.url;

  if (Roles.userIsInRole(user, ['guest'])) {
    appUrl = Meteor.settings.apps.device.url;
  }

  appUrl += '/#' + spliturl[1];

  return "To activate your account, simply click the link below:\n\n" +
    appUrl;
};

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  var spliturl = url.split('/#');

  var appUrl = Meteor.settings.apps.hotel.url;

  if (Roles.userIsInRole(user, ['guest'])) {
    appUrl = Meteor.settings.apps.device.url;
  }

  appUrl += '/#' + spliturl[1];

  return "To verify your account email, simply click the link below.:\n\n" +
    appUrl;
};

Accounts.validateNewUser(function(user) {
  // if adding a hotel-staff, or hotel-manager then allow creation
  var isHotelStaffOrManager = false;
  var hotelIsValid = false;
  // added ability to validate guest
  var userIsGuest = false;

  if (user.hotelId) {
    hotelIsValid = !!Hotels.findOne(user.hotelId);
  }

  if (!_.isEmpty(user.roles)) {
    isHotelStaffOrManager = _.any(user.roles, function(role) {
      return (role === 'hotel-staff' || role === 'hotel-manager');
    });
    userIsGuest = _.any(user.roles, function(role) {
      return (role === 'guest');
    });
  }

  if (hotelIsValid && isHotelStaffOrManager || userIsGuest) {
    return true;
  }
});


Accounts.onCreateUser(function(options, user) {
  if (options.roles == 'guest') {
    //create user as guest, not staff
    user.profile = options.profile;
    user.roles = [];
    user.roles.push('guest');

  } else {
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;

    var hotelIsValid = false;
    var isHotelStaff = false;
    var isHotelManager = false;

    if (options.hotelId) {
      hotelIsValid = !!Hotels.findOne(options.hotelId);
    }

    if (hotelIsValid) {
      user.hotelId = options.hotelId;
    } else {
      throw new Meteor.Error(500, 'Account creation is forbidden.');
    }

    if (!_.isEmpty(options.roles)) {
      isHotelStaff = _.any(options.roles, function(role) {
        return role === 'hotel-staff';
      });
      isHotelManager = _.any(options.roles, function(role) {
        return role === 'hotel-manager';
      });
    }

    user.roles = [];

    if (isHotelStaff) {
      user.roles.push('hotel-staff');
    }

    if (isHotelManager) {
      user.roles.push('hotel-manager');
    }

    if (!(isHotelStaff || isHotelManager)) {
      throw new Meteor.Error(500, 'Account creation is forbidden.');
    }

  }

  return user;
});

Accounts.validateLoginAttempt(function(attempt) {
  if (!attempt.allowed) {
    return false;
  }

  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      throw new Meteor.Error(300, 'Please verify your email address by clicking the link in the verification email that was sent to ' + attempt.user.emails[0].address + '.');
    } else {
      return true;
    }
  }
});

Accounts.onLoginFailure(function(attempt) {
  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      Accounts.sendVerificationEmail(attempt.user._id);
    }
  }
});

Meteor.methods({
  addHotelStaff: function(user) {
    check(user, Schema.addHotelStaff);

    if (Roles.userIsInRole(Meteor.user(), ['hotel-manager', 'admin'])) {
      var roles = ['hotel-staff'];
      if (user.isManager) {
        roles.push('hotel-manager');
      }

      // var parsedNumber = LibPhoneNumber.phoneUtil.parse(user.phone, user.countryCode || "US");
      // var format = LibPhoneNumber.PhoneNumberFormat;
      // user.phone = LibPhoneNumber.phoneUtil.format(parsedNumber, format.National);

      var profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      };

      var userId = Accounts.createUser({
        email: user.email,
        roles: roles,
        password: Meteor.uuid(),
        hotelId: user.hotelId,
        profile: profile
      });

      Accounts.sendEnrollmentEmail(userId, user.email);
      return {
        userId: userId,
        hotelId: user.hotelId
      };
    }
  },
  editHotelStaff: function(doc) {
    check(doc, Schema.addHotelStaff);

    var userId = doc.userId;

    if (!Roles.userIsInRole(userId, ['admin', 'device'])) {
      var roles = ['hotel-staff'];
      if (doc.isManager) {
        roles.push('hotel-manager');
      }
    } else {
      throw new Meteor.Error(500, 'This form can not be used to update device users or admin users');
    }
    //if (doc.phone) {
    //  var parsedNumber = LibPhoneNumber.phoneUtil.parse(doc.phone, doc.countryCode || "US");
    //  var format = LibPhoneNumber.PhoneNumberFormat;
    //  doc.phone = LibPhoneNumber.phoneUtil.format(parsedNumber, format.National);
    //}

    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        "profile.firstName": doc.firstName,
        "profile.lastName": doc.lastName,
        "profile.phone": doc.phone,
        roles: roles
      }
    });
  },
  checkInGuest: function(doc) {
    check(doc, Schema.GuestCheckIn);

    // is guest a previous user
    var user = Meteor.users.findOne({
      'emails.address': doc.guestEmail
    });
    if (user) {
      doc.guestId = user._id;
    } else {
      // create account for new guest
      var accountOptions = {
        email: doc.guestEmail,
        profile: {
          firstName: doc.guestFirstName,
          lastName: doc.guestLastName,
          phone: doc.guestPhone
        },
        roles: ['guest']
      }

      var userId = Accounts.createUser(accountOptions);

      Accounts.sendEnrollmentEmail(userId, accountOptions.email);

      doc.guestId = userId;
    }

    var room = Rooms.findOne(doc.roomId);

    if (!room) {
      throw new Meteor.Error(500, 'Not a valid room');
    }

    var users = [];
    users.push(doc.guestId);

    var stay = {
      hotelId: doc.hotelId,
      guestId: doc.guestId,
      users: users,
      zone: doc.zone,
      roomId: room._id,
      roomName: room.name, // Used frequently in UI, so denormalized
      checkInDate: new Date(),
      checkoutDate: doc.checkoutDate,
      active: true
    }

    var stayId = Stays.insert(stay);

    Rooms.update(room._id, {
      $set: {
        stayId: stayId
      }
    });

    Meteor.users.update(doc.guestId, {
      $set: {
        stayId: stayId
      }
    });

    return room.name;
  }
});
