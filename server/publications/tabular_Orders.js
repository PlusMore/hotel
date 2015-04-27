Meteor.publish("tabular_Orders", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  var ordersCursor = Orders.find({
    _id: {
      $in: ids
    }
  }, fields);

  var userIds = [];
  var roomIds = [];

  ordersCursor.map(function(order) {
    if (!_.contains(userIds, order.userId)) {
      userIds.push(order.userId);
    }
    if (!_.contains(userIds, order.receivedBy)) {
      userIds.push(order.receivedBy);
    }
    if (!_.contains(userIds, order.cancelledBy)) {
      userIds.push(order.cancelledBy);
    }
    if (!_.contains(userIds, order.completedBy)) {
      userIds.push(order.completedBy);
    }
    if (!_.contains(roomIds, order.roomId)) {
      roomIds.push(order.roomId);
    }
  })

  var usersCursor = Meteor.users.find({
    _id: {
      $in: userIds
    }
  });
  var roomsCursor = Rooms.find({
    _id: {
      $in: roomIds
    }
  });

  return [
    ordersCursor,
    usersCursor,
    roomsCursor
  ];
});
