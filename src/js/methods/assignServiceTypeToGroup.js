Meteor.methods({
  assignServiceTypeToGroup: function(doc) {
    check(doc, Schema.AssignServiceToGroup);

    Groups.update({_id: doc.groupId}, {$push: {servicesHandled: doc.serviceType}});
  }
});
