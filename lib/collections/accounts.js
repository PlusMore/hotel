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
    optional: true
  },
  isManager: {
    type: Boolean,
    label: "Is this user a Manager?",
  }
});

Meteor.users.helpers({
  userAvatar: function() {
    return this.profile && this.profile.avatarUrl && this.profile.avatarUrl+"/convert?w=160&h=160&fit=crop&align=faces" || "/img/profile.jpg";
  },
  userFirstName: function() {
    return this.profile && this.profile.firstName;
  },
  userLastName: function() {
    return this.profile && this.profile.lastName;
  },
  userFullName: function() {
    return "{0} {1}".format(this.profile.firstName, this.profile.lastName);
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

Meteor.methods({
  changeAccountAvatar: function(InkBlob) {
    check(InkBlob, Object);
    var userId = Meteor.userId();

    Meteor.users.update(userId, {
      $set: {
        "profile.avatarUrl": InkBlob.url,
        "profile.avatarName": InkBlob.filename,
        "profile.avatarSize": InkBlob.size
      }
    });
  }
})