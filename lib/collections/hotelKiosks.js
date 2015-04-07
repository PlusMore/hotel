HotelKiosks = new Meteor.Collection('hotelKiosks');

HotelKiosks.allow({
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

HotelKiosks.helpers({
  hasTeams: function() {
    return this.teamIds && this.teamIds.length > 0;
  },
  teams: function() {
    return Teams.find({_id: {$in: this.teamIds}});
  }
});

Schema.HotelKiosk = new SimpleSchema({
  name: {
    type: String,
    label: 'Kiosk Name'
  },
  description: {
    type: String,
    optional: true,
    label: "Description (optional)"
  },
  hotelId: {
    type: String
  },
  accountId: {
    type: String,
    optional: true
  },
  teamIds: {
    type: [String],
    optional: true
  },
  canCheckInGuests: {
    type: Boolean
  }
});

Meteor.methods({
  addTeamToKiosk: function(doc) {
    check(doc.kioskId, String);
    check(doc.teamId, String);

    HotelKiosks.update({_id: doc.kioskId}, {$push: {teamIds: doc.teamId}});

    return Teams.findOne(doc.teamId).name;
  },
  removeTeamFromKiosk: function(teamId, kioskId) {
    check(teamId, String);
    check(kioskId, String);

    HotelKiosks.update(kioskId, {$pull: {teamIds: teamId}});

    return {
      kioskName: HotelKiosks.findOne(kioskId).name,
      teamName: Teams.findOne(teamId).name
    };
  },
  removeKiosk: function(kioskId) {
    check(teamId, String);

    HotelKiosks.remove(kioskId);
  }
});
