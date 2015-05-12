Template.OpenOrdersBadge.onCreated(function () {
  var self = this;
  self.autorun(function() {
    var hotelId = Session.get('hotelId');
    self.subscribe('openOrdersWidget', hotelId);
  });
});
