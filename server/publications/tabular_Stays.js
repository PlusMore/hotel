Meteor.publish("tabular_Stays", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  var usersPub = new SimplePublication({
    subHandle: this,
    collection: Meteor.users,
    fields: {
      emails: 1,
      profile: 1
    },
    foreignKey: 'guestId',
    inverted: true
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Stays,
    selector: {
      _id: {
        $in: ids
      }
    },
    fields: fields,
    dependant: [
      usersPub
    ]
  }).start();
});
