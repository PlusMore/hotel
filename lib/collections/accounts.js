Schema.addHotelStaff = new SimpleSchema({
  hotelId: {
    type: String
  },
  email: {
    type: String,
    label: "E-mail address"
  },
  isManager: {
    type: Boolean,
    label: "Is this user a Manager?"
  }
});

Meteor.users.helpers({
  userAvatar: function() {
    return this.profile && this.profile.avatar || "/img/profile.jpg";
  },
  userFirstName: function() {
    return this.profile && this.profile.firstName;
  },
  userLastName: function() {
    return this.profile && this.profile.lastName;
  },
  userEmail: function() {
    return this.emails && this.emails[0].address;
  },
  userFriendlyRole: function() {
    if (this.roles) {
      switch (this.roles[0]) {
        case 'admin':
          return 'Admin';
        case 'hotel-staff':
          return 'Staff';
        case 'hotel-manager':
          return 'Manager';
        case 'device':
          return 'User';
        default:
          return '';
      }
    }
  },
  userHotelName: function() {
    var hotel = Hotels.findOne(this.hotelId);
    if (hotel) {
      return hotel.name;
    }
  }
});
