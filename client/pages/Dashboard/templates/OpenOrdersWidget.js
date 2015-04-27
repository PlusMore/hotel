Template.OpenOrdersWidget.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('openOrdersWidget', Session.get('hotelId'));
  });
});
