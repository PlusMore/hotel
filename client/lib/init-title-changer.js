Meteor.startup(function() {
  Session.setDefault('windowInactive', false);

  $(window).blur(function() {
    Session.set('windowInactive', true);
  });
  $(window).focus(function() {
    Session.set('windowInactive', false);
  });

  var titleChangeInterval;

  Tracker.autorun(function() {
    var orderCount = Counts.get('open-orders');
    var windowInactive = Session.get('windowInactive');

    var intervalLength = 4000;
    var showOrderCountLengthPerInterval = intervalLength / 2;

    if (orderCount > 0 && windowInactive) {
      titleChangeInterval = Meteor.setInterval(function() {
        document.title = "(" + orderCount + ") Open Orders";
        Meteor.setTimeout(function() {
          document.title = "PlusMore | Hotel";
        }, showOrderCountLengthPerInterval)
      }, intervalLength);
    } else {
      if (titleChangeInterval) {
        Meteor.clearInterval(titleChangeInterval);
      }
      document.title = "PlusMore | Hotel";
    }
  });
});
