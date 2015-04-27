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

Template.ViewStaff.onCreated(function() {
  // this prevents weirdness due to tabular's nonreactive selector
  forceReRender();
});
