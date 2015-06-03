Template.staffEditCell.events({
  'click #edit-staff-details': function(e) {
    e.preventDefault();
    Session.set('staffDetailsId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.StaffDetailsModal
    });
  }
});
