Template.openPatronOrders.helpers({
  hasOrders: function() {
    return Orders.find({for: 'hotel'}).count() > 0;
  },
  orders: function() {
    return Orders.find({for: 'hotel'});
  }
});