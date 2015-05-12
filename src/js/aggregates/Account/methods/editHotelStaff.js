Meteor.methods({
  editHotelStaff: function(doc) {
    check(doc, Schema.HotelStaff);

    var userId = doc.userId;

    if (!Roles.userIsInRole(userId, ['admin', 'device'])) {
      var roles = ['hotel-staff'];
      if (doc.isManager) {
        roles.push('hotel-manager');
      }
    } else {
      throw new Meteor.Error(500, 'This form can not be used to update device users or admin users');
    }

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
