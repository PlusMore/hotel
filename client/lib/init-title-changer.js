Session.setDefault('windowInactive', false);

$(window).blur(function(){
  Session.set('windowInactive', true);
});
$(window).focus(function(){
  Session.set('windowInactive', false);
});

Tracker.autorun(function() {
  setInterval(function() {
    var orderCount = Counts.get('open-orders');
    if (orderCount > 0 && Session.get('windowInactive')) {

      document.title = "(" + orderCount + ") Open Orders";

      setTimeout(function() {
        document.title = "PlusMore | Hotel";
      },1500);

    } else {
      document.title = "PlusMore | Hotel";
    }
  }, 4000);
});
