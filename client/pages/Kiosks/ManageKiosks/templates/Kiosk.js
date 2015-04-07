Template.Kiosk.helpers({
  addTeamToKioskSchema: function() {
    return Schema.teamForKiosk;
  },
  teamOptions: function() {
    var kioskTeamIds = HotelKiosks.findOne(this._id).teamIds;
    var teamsCursor = Teams.find({
      hotelId: Session.get('hotelId')
    }, {
      $sort: {
        name: 1
      }
    });
    var teams = teamsCursor.fetch();
    var teamIds = _.pluck(teams, '_id');
    if (this.hasTeams()) {
      teamIds = _.difference(teamIds, kioskTeamIds);
    }
    var teamOptions = [];
    _.each(teamIds, function(teamId) {
      teamOptions.push({
        label: Teams.findOne(teamId).name,
        value: teamId
      });
    });
    return teamOptions;
  },
  kioskId: function() {
    return this._id;
  }
});

Template.Kiosk.events({
  'click #remove-team-from-kiosk': function(e, tmpl) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      var teamId = this._id;
      var kioskId = tmpl.data._id;
      Meteor.call('removeTeamFromKiosk', teamId, kioskId, function(err, res) {
        Messages.success(res.teamName + ' successfully removed from ' + res.kioskName + ' Kiosk!');
      });
    }
  },
  'click #remove-kiosk': function(e) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      Meteor.call('removeKiosk', this._id, function(err, res) {
        Messages.success('Successfully removed kiosk!');
      });
      return true;
    } else {
      return false;
    }
  },
  'click #edit-kiosk': function(e) {
    e.preventDefault();
    Session.set('editKioskId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditKioskModal
    });
  }
});

// An array of objects is hard in autoform until updated to 5.0.0, so a meteor method will be used until then
Schema.teamForKiosk = new SimpleSchema({
  teamId: {
    type: String
  },
  kioskId: {
    type: String
  }
});

AutoForm.hooks({
  addTeamToKioskForm: {
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully added ' + result + ' Team to the Kiosk!');
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
