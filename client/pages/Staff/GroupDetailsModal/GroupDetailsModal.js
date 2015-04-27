Template.GroupDetailsModal.helpers({
  group: function() {
    return Groups.findOne(Session.get('viewGroupId'));
  }
});

Template.GroupDetailsModal.onCreated(function() {
  this.subscribe('usersForGroupId', Session.get('viewGroupId'));
  this.subscribe('groupDetails', Session.get('viewGroupId'));
});
