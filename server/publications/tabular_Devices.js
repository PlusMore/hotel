Meteor.publish("tabular_Devices", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  // get stays that match room stayIds
  var staysPub = new SimplePublication({
    subHandle: this,
    collection: Stays,
    foreignKey: 'stayId',
    inverted: true
  });

  // get rooms that match device roomIds
  var roomsPub = new SimplePublication({
    subHandle: this,
    collection: Rooms,
    foreignKey: 'roomId',
    inverted: true,
    dependant: [
      staysPub
    ]
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Devices,
    selector: {
      _id: {
        $in: ids
      }
    },
    fields: fields,
    dependant: [
      roomsPub,
      staysPub
    ]
  }).start();
});
