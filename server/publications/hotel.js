Meteor.publish('hotel', function(id) {
  return Hotels.find(id);
});
