Template.WeatherInfo.rendered = function() {
  var hotel = Hotels.findOne(Session.get('hotelId'));

  var location;
  if (hotel && hotel.geo) {
    location = hotel.geo.latitude + ',' + hotel.geo.longitude
  }

  var options = {
    unit: 'f',
    success: function(weather) {
      //html = '<i class="icon-' + weather.code + '"></i>'
      //html += '<span class="total text-center">' + weather.temp + '&deg;' + weather.units.temp + '</span>';
      //html += '<span class="title text-center">' + weather.currently + '</span>';

      $("#temp").html(weather.temp + '&deg;' + weather.units.temp);
      $("#conditions").html(weather.currently);

      //$("#weather").html(html);
    },
    error: function(error) {
      //$("#weather").html('<p>' + error + '</p>');
    }
  }

  if (location)
    _.extend(options, {
      location: location
    });

  Weather.options = options;
  Weather.load();
};

Template.WeatherWidget.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotel = Session.get('hotelId');
    self.subscribe('hotelGeo', Session.get('hotelId'));
  })
});
