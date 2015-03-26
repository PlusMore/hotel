Template.ViewStaff.rendered = function() {
  this.$('table').parent().addClass('table-responsive');
};

Template.ViewStaff.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId
    };
  }
});
