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
    if (this.hasMembers()) {
      return _.contains(this.memberIds, userId);
    }
  }
});
