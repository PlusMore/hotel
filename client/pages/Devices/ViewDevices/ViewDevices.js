Template.ViewDevices.rendered = function() {
  this.$('table').parent().addClass('table-responsive');
};

Template.ViewDevices.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId
    };
  }
});

Template.ViewDevices.onCreated(function() {
  // this prevents weirdness due to tabular's nonreactive selector
  forceReRender();
});
