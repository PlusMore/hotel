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
  }
});
