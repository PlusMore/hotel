Accounts.emailTemplates.siteName = "Plus More";
Accounts.emailTemplates.from = "noreply@plusmoretablets.com";
Accounts.emailTemplates.enrollAccount.subject = function(user) {
  return "Welcome to Plus More";
};
Accounts.emailTemplates.enrollAccount.text = function(user, url) {
  var spliturl = url.split('/#');
  url = Meteor.settings.apps.hotel.url + '/#' + spliturl[1];

  return "To activate your account, simply click the link below:\n\n" +
    url;
};

Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  var spliturl = url.split('/#');
  url = Meteor.settings.apps.hotel.url + '/#' + spliturl[1];

  return "To verify your account email, simply click the link below.:\n\n" +
    url;
};

Accounts.validateNewUser(function(user) {
  // if adding a hotel-staff, or hotel-manager then allow creation
  var isHotelStaffOrManager = false;
  var hotelIsValid = false;

  if (user.hotelId) {
    hotelIsValid = !!Hotels.findOne(user.hotelId);
  }

  if (!_.isEmpty(user.roles)) {
    isHotelStaffOrManager = _.any(user.roles, function(role) {
      return (role === 'hotel-staff' || role === 'hotel-manager');
    });
  }

  if (hotelIsValid && isHotelStaffOrManager) {
    return true;
  }
});


Accounts.onCreateUser(function(options, user) {
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
      roles = ['hotel-staff'];
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

  }
});
