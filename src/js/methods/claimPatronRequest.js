Meteor.methods({
  claimPatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order');
    }

    Orders.update(orderId, {
      $set: {
        status: 'pending',
        receivedDate: new Date(),
        receivedBy: Meteor.userId()
      }
    });
  }
});
