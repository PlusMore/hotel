Template.ManageTeams.helpers({

});

Template.ManageTeams.events({
	'click #create-new-team': function(e) {
		e.preventDefault();
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.CreateTeamModal
    });
	}
});