Template.GuestCheckInWidget.events({
  'click #launch-checkin-modal': function(e) {
    e.preventDefault();
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.GuestCheckInModal
    });
  }
});

Template.GuestCheckInWidget.onCreated(function() {
  var self = this;
  var now = Session.get('currentTime');
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('roomsAndActiveStays', hotel, now);
  })
});
