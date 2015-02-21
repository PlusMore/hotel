Template.staffEditCell.events({
	'click #edit-staff-details': function(e) {
		Session.set('staffDetailsId', this._id);
		BootstrapModalPrompt.prompt({
      dialogTemplate: Template.StaffDetailsModal
    });
	}
});