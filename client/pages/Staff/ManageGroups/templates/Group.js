Template.Group.helpers({
  addUserToGroupSchema: function() {
    return Schema.userForGroup;
  },
  staffOptions: function() {
    var memberIds = Groups.findOne(this._id).memberIds;
    var usersCursor = Meteor.users.find({
      hotelId: Session.get('hotelId')
    }, {
      $sort: {
        "profile.firstName": 1
      }
    });
    var users = usersCursor.fetch();
    var userIds = _.pluck(users, '_id');
    if (this.hasMembers()) {
      userIds = _.difference(userIds, memberIds);
    }
    var staffOptions = [];
    _.each(userIds, function(userId) {
      staffOptions.push({
        label: Meteor.users.findOne(userId).fullName(),
        value: userId
      });
    });
    return staffOptions;
  },
  groupId: function() {
    return this._id;
  }
});

Template.Group.events({
  'click #remove-member-from-group': function(e, tmpl) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      var userId = this._id;
      var groupId = tmpl.data._id;
      Meteor.call('removeUserFromGroup', userId, groupId, function(err, res) {
        Messages.success(res.userName + ' successfully removed from ' + res.groupName + ' group!');
      });
    }
  },
  'click #remove-group': function(e) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      Meteor.call('removeGroup', this._id, function(err, res) {
        Messages.success('Successfully removed group!');
      });
      return true;
    } else {
      return false;
    }
  },
  'click #edit-group': function(e) {
    e.preventDefault();
    Session.set('updateGroupId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditGroupModal
    });
  }
});

AutoForm.hooks({
  insertGroupMember: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully added ' + result + ' to the group!');
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "pre-submit validation") {
        Messages.error(error.message);
      }
    },
  }
});
