Template.OrderHistory.rendered = function () {
  this.$('table').parent().addClass('table-responsive');
};

Template.OrderHistory.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId,
      open: false,
      handledBy: 'hotel'
    };
  }
});