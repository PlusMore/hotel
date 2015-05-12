Meteor.methods({
  completePatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(500, 'Not a valid order');
    }

    Orders.update(orderId, {
      $set: {
        open: false,
        status: 'completed',
        completedDate: new Date(),
        completedBy: Meteor.userId()
      }
    });
  }
});
