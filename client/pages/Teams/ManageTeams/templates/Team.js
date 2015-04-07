Template.Team.helpers({
  addUserToTeamSchema: function() {
    return Schema.userForTeam;
  },
  staffOptions: function() {
    var memberIds = Teams.findOne(this._id).memberIds;
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
  teamId: function() {
    return this._id;
  }
});

Template.Team.events({
  'click #remove-member-from-team': function(e, tmpl) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      var userId = this._id;
      var teamId = tmpl.data._id;
      Meteor.call('removeUserFromTeam', userId, teamId, function(err, res) {
        Messages.success(res.userName + ' successfully removed from ' + res.teamName + ' team!');
      });
    }
  },
  'click #remove-team': function(e) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      Meteor.call('removeTeam', this._id, function(err, res) {
        Messages.success('Successfully removed team!');
      });
      return true;
    } else {
      return false;
    }
  },
  'click #edit-team': function(e) {
    e.preventDefault();
    Session.set('updateTeamId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditTeamModal
    });
  }
});

// An array of objects is hard in autoform until updated to 5.0.0, so a meteor method will be used until then
Schema.userForTeam = new SimpleSchema({
  teamId: {
    type: String
  },
  userId: {
    type: String
  }
});

AutoForm.hooks({
  insertTeamMember: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully added ' + result + ' to the team!');
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
    },
  }
});
