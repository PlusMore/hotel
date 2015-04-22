Template.GuestCheckInWidget.events({
  'click #launch-checkin-modal': function(e) {
    e.preventDefault();
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.GuestCheckInModal
    });
  }
});
