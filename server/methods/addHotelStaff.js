Meteor.methods({
  addHotelStaff: function(user) {
    check(user, Schema.HotelStaff);

    if (Roles.userIsInRole(Meteor.user(), ['hotel-manager', 'admin'])) {
      var roles = ['hotel-staff'];
      if (user.isManager) {
        roles.push('hotel-manager');
      }

      var profile = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      };

      var userId = Accounts.createUser({
        email: user.email,
        roles: roles,
        hotelId: user.hotelId,
        profile: profile
      });

      Accounts.sendEnrollmentEmail(userId, user.email);

      return {
        userId: userId,
        hotelId: user.hotelId
      };
    } else {
      throw new Meteor.Error(500, 'You do not have the required permissions');
    }
  }
});
