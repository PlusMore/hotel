Orders = new Meteor.Collection('orders');

// Allow/Deny

Orders.allow({
  insert: function(userId, doc){
    return false;
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin', 'hotel-staff', 'hotel-manager']);
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
  claimPatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {status: 'pending', receivedDate: new Date(), receivedBy: Meteor.userId() }});
  },
  completePatronRequest: function(orderId) {
    var order = Orders.findOne(orderId);
    if (!order) {
      throw new Meteor.Error(403, 'Not a valid order'); 
    }

    Orders.update(orderId, {$set: {open: false; status: 'complete', completedDate: new Date(), completedBy: Meteor.userId() }});
  },
  getPatronName: function(userId) {
    check(userId, String);
    return Meteor.users.findOne( {_id: userId} ).profile.lastName;
  }
  //assignPatronRequest: function(orderId,userId) {
  //  var order = Orders.findOne(orderId);
  //  if (!order) {
  //    throw new Meteor.Error(403, 'Not a valid order'); 
  //  }
  //
  //  Orders.update(orderId, {$set: {assignedDate: new Date(), assignedTo: Meteor.userId() }});
  //}
});