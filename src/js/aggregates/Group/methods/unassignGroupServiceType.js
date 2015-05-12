Meteor.methods({
  unassignGroupServiceType: function(groupId, serviceType) {
    check(groupId, String);
    check(serviceType, String);

    Groups.update(groupId, {$pull: {servicesHandled: serviceType}});
  }
});
