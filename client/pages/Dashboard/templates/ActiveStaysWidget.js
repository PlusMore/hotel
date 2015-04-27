Template.ActiveStaysWidget.helpers({
  totalDevices: function() {
    return Devices.find().count();
  }
});

Template.ActiveStaysGauge.rendered = function() {
  var self = this;
  var opts = {
    lines: 12, // The number of lines to draw
    angle: 0, // The length of each line
    lineWidth: 0.4, // The line thickness
    pointer: {
      length: 0.75, // The radius of the inner circle
      strokeWidth: 0.042, // The rotation offset
      color: '#1D212A' // Fill color
    },
    limitMax: 'false', // If true, the pointer will not go past the end of the gauge
    colorStart: App.colors.primaryDark, // Colors
    colorStop: App.colors.primary, // just experiment with them
    strokeColor: '#F0F3F3', // to see which ones work best for you
    generateGradient: true
  };
  var target = document.getElementById('gauge'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  self.autorun(function() {
    var totalRooms = Counts.get('total-rooms');
    var totalActiveStays = Counts.get('total-active-stays');
    gauge.maxValue = totalRooms;
    if (totalActiveStays > 0) {
      gauge.set(totalActiveStays);
    } else {
      // this is so stupid, but it works
      gauge.set(0.01);
    }
  });
  gauge.setTextField(document.getElementById("gauge-text"));
};

Template.ActiveStaysWidget.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('activeStaysWidget', Session.get('hotelId'));
  })
});
