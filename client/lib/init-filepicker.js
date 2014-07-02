Meteor.startup(function() {
  // init filepicker
  Session.set("widgetSet", false);
  var key = "A2yOQB3VHRfe2n6QnJ5vZz";

  if (!Session.get("widgetSet")) {
    loadPicker(key);
    Session.set('widgetSet', true);
  }
});
