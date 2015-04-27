Template.ManageGroups.helpers({
  groups: function() {
    return Groups.find();
  }
});

Template.ManageGroups.events({
	'click #create-new-group': function(e) {
		e.preventDefault();
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.CreateGroupModal
    });
	}
});
