Meteor.methods({
  editRoom: function(doc) {
    check(doc.name, String);
    check(doc.hotelId, String);
    check(doc.roomId, String);

    Rooms.update({
      _id: doc.roomId
    }, {
      $set: {
        name: doc.name
      }
    });
  }
});
