Meteor.methods({
  updateHotelInfo: function(doc) {
    check(doc, Object);
    var user = Meteor.user();

    if (user && Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      Hotels.upsert(doc.hotelId, {
        $set: {
          name: doc.name,
          phone: doc.phone,
          description: doc.description
        }
      });
    } else {
      Errors.throw('You do not have proper access to this functionality.');
    }
  }
});
