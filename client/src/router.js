// when location changes, close the menu
// only matters on xs devices
Tracker.autorun(function() {
  var location = Iron.Location.get();
  $('#main-wrapper').removeClass('sidebar-opened');
});
