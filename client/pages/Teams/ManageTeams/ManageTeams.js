Template.ManageTeams.helpers({
  teams: function() {
    return Teams.find();
  }
});

Template.ManageTeams.events({
	'click #create-new-team': function(e) {
		e.preventDefault();
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.CreateTeamModal
    });
	}
});
