Template.Team.helpers({
  teamMembers: function() {
    return Meteor.users.find({_id: {$in: this.members}});
  },
  addUserToTeamSchema: function() {
    return Schema.userForTeam;
  },
  staffOptions: function() {
    var members = Teams.findOne(this._id).members;
    var usersCursor = Meteor.users.find({hotelId: Session.get('hotelId')}, {$sort: {"profile.firstName": 1}});
    var users = usersCursor.fetch();
    var userIds = _.pluck(users, '_id');
    if (this.hasMembers()) {
      userIds = _.difference(userIds, members);
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
      Messages.success('Successfully added ' + result + 'to the team!');
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
