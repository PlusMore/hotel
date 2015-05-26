Meteor.methods({
  unassignGroupServiceId: function(groupId, serviceId) {
    check(groupId, String);
    check(serviceId, String);

    Groups.update(groupId, {
      $pull: {
        servicesHandled: serviceId
      }
    });
  }
});
