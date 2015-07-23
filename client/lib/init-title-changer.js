Tracker.autorun(function() {
  var orderCount = Counts.get('open-orders');

  if (orderCount > 0) {
    document.title = "(" + orderCount + ") PlusMore | Hotel";
  } else {
    document.title = "PlusMore | Hotel";
  }
});
