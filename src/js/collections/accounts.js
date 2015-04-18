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
