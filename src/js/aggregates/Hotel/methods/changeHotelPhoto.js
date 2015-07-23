Meteor.methods({
  changeHotelPhoto: function(InkBlob, hotelId) {
    check(InkBlob, Object);
    var user = Meteor.user();

    if (user && Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {

      if (hotelId) {
        var hotel = Hotels.findOne(hotelId);

        if (!hotel) {
          Errors.throw('No hotel found');
        }

        Hotels.upsert(hotelId, {
          $set: {
            photoUrl: InkBlob.url,
            photoName: InkBlob.filename,
            photoSize: InkBlob.size
          }
        });
      }
    } else {
      throw new Meteor.Error(403, 'You do not have the required permissions');
    }
  }
});
