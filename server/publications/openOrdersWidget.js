Meteor.publish('openOrdersWidget', function(selector) {
  Counts.publish(this, 'open-orders', Orders.find(selector));
});
