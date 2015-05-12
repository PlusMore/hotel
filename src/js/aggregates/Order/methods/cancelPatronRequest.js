Meteor.methods({
  cancelPatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(500, 'Not a valid order');
    }

    Orders.update(orderId, {
      $set: {
        open: false,
        status: 'cancelled',
        cancelledDate: new Date(),
        cancelledBy: Meteor.userId()
      }
    });
  }
});
