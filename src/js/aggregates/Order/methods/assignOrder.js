Meteor.methods({
  assignOrder: function(orderId, userId) {
    check(orderId, String);
    check(userId, String);

    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(500, 'Not a valid order');
    }

    Orders.update(orderId, {
      $set: {
        status: 'pending',
        receivedDate: new Date(),
        receivedBy: userId
      }
    });
  }
});
