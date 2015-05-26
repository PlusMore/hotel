Meteor.publish('openOrdersWidget', function(selector) {
  Counts.publish(this, 'open-orders', Orders.find(selector));
});

Meteor.startup(function () {
  Orders._ensureIndex({hotelId: 1, requestedWhen: -1}, {background: true});
});
