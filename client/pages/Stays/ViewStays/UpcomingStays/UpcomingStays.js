Template.UpcomingStays.helpers({
  selector: function() {
    var hotelId = Session.get('hotelId');
    var now = Session.get('currentTime');

    return {
      hotelId: hotelId,
      active: false,
      preReg: {
        $exists: true
      },
      "preReg.startDate": {
        $gte: now
      }
    };
  }
});

Template.UpcomingStays.onCreated(function() {
  // this prevents weirdness due to tabular's nonreactive selector
  TabularTables.refresh();
});
