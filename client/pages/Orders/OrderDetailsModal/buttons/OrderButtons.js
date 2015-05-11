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

Template.AssignButton.helpers({
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

Template.OrderButtons.onCreated(function() {
  // this should probably only subscribe to users in groups that manage the service type
  this.subscribe('hotelUsers', Session.get('hotelId'));
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

Template.CancelButton.events({
  'click .btn-cancel-order': function(e) {
    if (confirm("Are you sure you want to cancel this order?")) {
      BootstrapModalPrompt.dismiss();
      Meteor.call('cancelPatronRequest', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Order Successfully Cancelled');
        }
      });
    }
  }
});

Template.CompleteButton.events({
  'click .btn-complete-order': function(e) {
    if (confirm("Are you sure you want to close this order?")) {
      Meteor.call('completePatronRequest', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Order Completed!');
          BootstrapModalPrompt.dismiss();
        }
      });
    }
  }
});
