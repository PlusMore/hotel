Schema.addHotelStaff = new SimpleSchema({
  hotelId: {
    type: String
  },
  firstName: {
    type: String,
    label: "First Name"
  },
  lastName: {
    type: String,
    label: "Last Name"
  },
  email: {
    type: String,
    label: "E-mail address"
  },
  phone: {
    type: String,
    label: "Phone Number (Optional)",
    optional: true,
    min: 7
  },
  isManager: {
    type: Boolean,
    label: "Is this user a Manager?",
  },
  userId: {
    type: String,
    optional: true
  }
});

Meteor.users.helpers({
  avatar: function() {
    return this.profile && this.profile.avatarUrl && this.profile.avatarUrl + "/convert?w=160&h=160&fit=crop&align=faces" || "/img/profile.jpg";
  },
  firstName: function() {
    return this.profile && this.profile.firstName;
  },
  lastName: function() {
    return this.profile && this.profile.lastName;
  },
  fullName: function() {
    if (this.profile && this.profile.firstName) {
      return "{0} {1}".format(this.profile.firstName, this.profile.lastName);
    }
  },
  email: function() {
    return this.emails && this.emails[0].address;
  },
  phone: function() {
    return this.profile && this.profile.phone;
  },
  friendlyRole: function() {
    if (Roles.userIsInRole(this._id, ['admin'])) {
      return 'Admin';
    } else if (Roles.userIsInRole(this._id, ['hotel-manager'])) {
      return "Manager";
    } else if (Roles.userIsInRole(this._id, ['hotel-staff'])) {
      return "Staff";
    } else if (Roles.userIsInRole(this._id, ['guest'])) {
      return "Guest";
    } else {
      return "Undefined";
    }
  },
  hotel: function() {
    var hotel = Hotels.findOne(this.hotelId);
    if (hotel) {
      return hotel;
    }
  },
  isManager: function() {
    return Roles.userIsInRole(this._id, ['hotel-manager', 'admin']);
  }
});

Meteor.methods({
  changeAccountAvatar: function(InkBlob, userId) {
    check(InkBlob, Object);
    check(userId, String);

    Meteor.users.update(userId, {
      $set: {
        "profile.avatarUrl": InkBlob.url,
        "profile.avatarName": InkBlob.filename,
        "profile.avatarSize": InkBlob.size
      }
    });
  },
  editAccountInfo: function(doc) {
    check(doc.userId, String);
    check(doc.firstName, String);
    check(doc.lastName, String);
    check(doc.email, String);

    var emailChanged = Meteor.users.findOne(doc.userId).email() != doc.email ? true : false;

    if (emailChanged) {

      var userWithSameEmail = Meteor.users.findOne({emails: {$elemMatch: {address: doc.email}}});
      if (userWithSameEmail) {
        throw new Meteor.Error(500, 'User with that email already exists');
      }

      var account = {
        "profile.firstName": doc.firstName,
        "profile.lastName": doc.lastName,
        "emails.0.address": doc.email
      };

      Meteor.users.update({_id: doc.userId}, {$set: account});
    } else {
      var account = {
        "profile.firstName": doc.firstName,
        "profile.lastName": doc.lastName
      };

      Meteor.users.update({_id: doc.userId}, {$set: account});
    }
  }
});
