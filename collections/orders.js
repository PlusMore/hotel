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
  }
});