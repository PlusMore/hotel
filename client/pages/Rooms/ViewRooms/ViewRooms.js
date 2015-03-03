Template.ViewRooms.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId
    };
  }
});

Template.ViewRooms.rendered = function() {
  this.$('table').parent().addClass('table-responsive');
};
