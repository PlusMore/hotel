Orders = new Meteor.Collection('orders');

// Allow/Deny

Orders.allow({
  insert: function(userId, doc){
    return false;
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin', 'hotel-staff']);
  },
  remove:  function(userId, doc){
    return false;
  }
});

Meteor.methods({
  markAsRead: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    return Orders.update(orderId, {$set: {read: true}});
  },
  cancelPatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false, status: 'cancelled', cancelledDate: new Date(), cancelledBy: Meteor.userId() }});

    this.unblock();

    if (Meteor.server) {
      var request = order.request;

      Email.send({
        to: 'order-service@plusmoretablets.com',
        from: 'noreply@plusmoretablets.com',
        subject: 'Cancelled - Request for {0}'.format(request.type),
        text: "Request for {0} has been cancelled.\n\n".format(request.type)
            + "Request Details:\n\n"
            + "Room: {0}\n".format(order.deviceLocation)
            + "When: {0}\n".format(request.date)
      });
    }
  }
});