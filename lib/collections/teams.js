Teams = new Meteor.Collection('teams');

Teams.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

Teams.helpers({
  hasMembers: function() {
    return this.memberIds && this.memberIds.length > 0;
  },
  teamMembers: function() {
    if (this.hasMembers()) {
      return Meteor.users.find({_id: {$in: this.memberIds}});
    }
  },
  containsMember: function(userId) {
    return _.contains(this.memberIds, userId);
  }
});

Schema.Team = new SimpleSchema({
  name: {
    type: String,
    label: 'Team Name'
  },
  description: {
    type: String,
    optional: true,
    label: "Description (optional)"
  },
  hotelId: {
    type: String
  },
  memberIds: {
    type: [String],
    optional: true
  }
});

Meteor.methods({
  addUserToTeam: function(doc) {
    check(doc.teamId, String);
    check(doc.userId, String);

    Teams.update({_id: doc.teamId}, {$push: {memberIds: doc.userId}});

    return Meteor.users.findOne(doc.userId).fullName();
  },
  removeUserFromTeam: function(userId, teamId) {
    check(userId, String);
    check(teamId, String);

    Teams.update(teamId, {$pull: {memberIds: userId}});

    return {
      userName: Meteor.users.findOne(userId).fullName(),
      teamName: Teams.findOne(teamId).name
    };
  },
  removeTeam: function(teamId) {
    check(teamId, String);

    Teams.remove(teamId);
  }
});
