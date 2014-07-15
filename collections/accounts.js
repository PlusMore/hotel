Schema.addHotelStaff = new SimpleSchema({
  email: {
    type: String,
    label: "E-mail address"
  },
  isManager: {
    type: Boolean,
    label: "Manager"
  }
});

Meteor.methods({
  addHotelStaff: function (newStaff) {
    check(newStaff, Schema.addHotelStaff);
    var user = Meteor.user();

    if (user && Roles.userIsInRole(user, ['hotel-manager'])) {
      if (!this.isSimulation) {
        var roles = ['hotel-staff'];

        if (newStaff.isManager) {
          roles.push('hotel-manager');
        }
        var userId = Accounts.createUser({
          email: newStaff.email,
          roles: roles,
          password: Meteor.uuid()
        });

        Meteor.users.update(userId, {$set: {hotelId: newStaff.hotelId}});
        Roles.addUsersToRoles(userId, roles);
        Accounts.sendEnrollmentEmail(userId, newStaff.email)
        return userId;
      }
    }

    
  }
});