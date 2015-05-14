Template.ViewRooms.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    return {
      hotelId: hotelId
    };
  }
});

Template.ViewRooms.onCreated(function() {
  // this prevents weirdness due to tabular's nonreactive selector
  TabularTables.refresh();
});
