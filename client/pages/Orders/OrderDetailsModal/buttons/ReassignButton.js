Template.ReassignButton.helpers({
  reassignButtonClass: function() {
    if (this.isUnassigned()) {
      return "btn-default disabled";
    } else {
      return "btn-info";
    }
  },
  userOptions: function() {
    var groupsAssignedCursor = this.groupsAssigned();
    var groupsAssigned = groupsAssignedCursor.fetch();
    var userIds = [];
    _.each(groupsAssigned, function(group) {
      userIds.push.apply(userIds, group.memberIds);
    });
    // remove dupes
    userIds = _.uniq(userIds);

    // remove current user as displayed elsewhere
    userIds = _.without(userIds, Meteor.user()._id);
    users = Meteor.users.find({_id: {$in: userIds}}, {$sort: {"profile.firstName": 1}}).fetch();
    return users;
  }
});

Template.ReassignButton.events({
  'click .reassign-user': function(e, tmpl) {
    e.preventDefault();
    var userId = $(e.target).attr("staff-id");
    var orderId = tmpl.data._id;
    Meteor.call('reassignOrder', orderId, userId, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('You have reassigned this order!');
      }
    });
  }
});
