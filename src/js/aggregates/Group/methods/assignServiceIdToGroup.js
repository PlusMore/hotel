Meteor.methods({
  assignServiceIdToGroup: function(doc) {
    check(doc, Schema.AssignServiceToGroup);

    Groups.update({
      _id: doc.groupId
    }, {
      $push: {
        servicesHandled: doc.serviceId
      }
    });
  }
});
