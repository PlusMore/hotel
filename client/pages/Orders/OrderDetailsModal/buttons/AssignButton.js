Template.AssignButton.helpers({
  userOptions: function() {
    var groupsAssignedCursor = this.groupsAssigned(); // collection helper
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

Template.AssignButton.events({
  'click .assign-user': function(e, tmpl) {
    e.preventDefault();
    var userId = $(e.target).attr("staff-id");
    var orderId = tmpl.data._id;
    Meteor.call('assignOrder', orderId, userId, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('You have assigned this order!');
      }
    });
  }
});
