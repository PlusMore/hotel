Template.patronOrders.helpers({
  hasOrders: function() {
    return Orders.find({for: 'hotel', open: true}).count() > 0;
  },
  orders: function() {
    return Orders.find({for: 'hotel', open: true}, {sort: {requestedAt: -1}});
  }
});