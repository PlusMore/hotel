Meteor.publish("tabular_Rooms", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  // users by guestId in stay
  var usersPub = new SimplePublication({
    subHandle: this,
    collection: Meteor.users,
    foreignKey: 'guestId',
    inverted: true
  });

  // stays by stayId in room
  var staysPub = new SimplePublication({
    subHandle: this,
    collection: Stays,
    foreignKey: 'stayId',
    inverted: true,
    dependant: [
      usersPub
    ]
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Rooms,
    selector: {
      _id: {
        $in: ids
      }
    },
    options: {
      $sort: {
        name: 1
      }
    },
    fields: fields,
    dependant: [
      staysPub,
      usersPub
    ]
  }).start();

});
