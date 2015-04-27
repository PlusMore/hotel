Meteor.publish('tags', function(collectionName) {
  return Meteor.tags.find({
    collection: collectionName
  });
});
