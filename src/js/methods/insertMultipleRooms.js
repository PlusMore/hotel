Meteor.methods({
  insertMultipleRooms: function(doc) {
    check(doc.startNum, Number);
    check(doc.endNum, Number);
    check(doc.hotelId, String);

    var roomRange = _.range(doc.startNum, doc.endNum + 1);

    _.each(roomRange, function(i) {
      var room = "Room " + i;

      if (Rooms.find({
          hotelId: doc.hotelId,
          name: room
        }).count() > 0) {

        throw new Meteor.Error(403, 'You have attempted to create a room (' + room + ') that already exists. No rooms were created.');
      }
    });

    _.each(roomRange, function(i) {
      room = "Room " + i;

      Rooms.insert({
        hotelId: doc.hotelId,
        name: room
      }, {
        $set: {
          hotelId: doc.hotelId,
          name: room
        }
      });
    });
  }
});
