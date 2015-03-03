Template.OpenOrders.rendered = function() {
  this.$('table').parent().addClass('table-responsive');
};

Template.OpenOrders.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId,
      open: true,
      handledBy: 'hotel'
    };
  }
});
