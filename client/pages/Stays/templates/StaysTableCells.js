Template.ViewStayCell.events({
  'click #view-stay': function(e) {
    e.preventDefault();
    Session.set('viewStayId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.StayDetailsModal
    });
  }
});
