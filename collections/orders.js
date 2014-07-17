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
  cancelPatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false, status: 'cancelled', cancelledDate: new Date(), cancelledBy: Meteor.userId() }});
  },
  completePatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false, status: 'confirmed', confirmedDate: new Date(), confirmedBy: Meteor.userId() }});
  }
});