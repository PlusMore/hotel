Template.GoogleMaps.rendered = function () {
  var tmpl = this;

  VazcoMaps.init({}, function() {

    tmpl.GMaps = VazcoMaps.gMaps();

    // basic map
    tmpl.basicMap = new tmpl.GMaps({
      div: '#basic-map',
      lat: 40.7127,
      lng: -74.0059,
      zoom: 6
    });

    // map events
    tmpl.mapEvents = new tmpl.GMaps({
      div: '#map-events',
      zoom: 16,
      lat: 40.7127,
      lng: -74.0059,
      click: function(e) {
        alert('click');
      },
      dragend: function(e) {
        alert('dragend');
      }
    });

    // map markers
    tmpl.mapMarkers = new tmpl.GMaps({
      div: '#map-markers',
      lat: -12.043333,
      lng: -77.028333
    });
    tmpl.mapMarkers.addMarker({
      lat: -12.043333,
      lng: -77.03,
      title: 'Lima',
      details: {
        database_id: 42,
        author: 'HPNeo'
      },
      click: function(e){
        if(console.log)
          console.log(e);
        alert('You clicked in this marker');
      }
    });
    tmpl.mapMarkers.addMarker({
      lat: -12.042,
      lng: -77.028333,
      title: 'Marker with InfoWindow',
      infoWindow: {
        content: '<p>HTML Content</p>'
      }
    });

    // geolocation
    tmpl.mapGeolocation = new tmpl.GMaps({
      div: '#map-geolocation',
      lat: 40.7127,
      lng: -74.0059
    });
    tmpl.GMaps.geolocate({
      success: function(position){
        tmpl.mapGeolocation.setCenter(position.coords.latitude, position.coords.longitude);
      },
      error: function(error){
        alert('Geolocation failed: '+error.message);
      },
      not_supported: function(){
        alert("Your browser does not support geolocation");
      },
      always: function(){
        //alert("Done!");
      }
    });

    tmpl.mapGeocoding = new tmpl.GMaps({
      div: '#map-geocoding',
      lat: 40.7127,
      lng: -74.0059
    });
    // submit event in Template.GoogleMaps.events below

    // polylines
    tmpl.polylinesMap = new tmpl.GMaps({
      div: '#map-polylines',
      lat: -12.043333,
      lng: -77.028333,
      click: function(e){
        console.log(e);
      }
    });
    path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];
    tmpl.polylinesMap.drawPolyline({
      path: path,
      strokeColor: App.colors.primary,
      strokeOpacity: 0.6,
      strokeWeight: 6
    });

    // overlays
    tmpl.mapOverlays = new tmpl.GMaps({
      div: '#map-overlays',
      lat: -12.043333,
      lng: -77.028333
    });
    tmpl.mapOverlays.drawOverlay({
      lat: tmpl.mapOverlays.getCenter().lat(),
      lng: tmpl.mapOverlays.getCenter().lng(),
      content: '<div class="map-overlay">Lima<div class="map-overlay_arrow above"></div></div>',
      verticalAlign: 'top',
      horizontalAlign: 'center'
    });

    // polygon
    tmpl.mapPolygon = new tmpl.GMaps({
      div: '#map-polygon',
      lat: -12.043333,
      lng: -77.028333
    });

    var path = [[-12.040397656836609,-77.03373871559225],
                [-12.040248585302038,-77.03993927003302],
                [-12.050047116528843,-77.02448169303511],
                [-12.044804866577001,-77.02154422636042]];

    polygon = tmpl.mapPolygon.drawPolygon({
      paths: path,
      strokeColor: App.colors.primaryDark,
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: App.colors.primary,
      fillOpacity: 0.6
    });

    //static map
    var $staticMap = tmpl.$("#map-static");

    var url = tmpl.GMaps.staticMapURL({
      size: [$staticMap.width(), $staticMap.height()],
      lat: -12.043333,
      lng: -77.028333
    });

    var img = $('<img/>').attr('src', url);
    $staticMap.append(img);

    // static map with markers
    var $staticMap2 = tmpl.$("#map-static-markers");

    var url2 = tmpl.GMaps.staticMapURL({
      size: [$staticMap2.width(), $staticMap2.height()],
      lat: -12.043333,
      lng: -77.028333,
      markers: [
        {lat: -12.043333, lng: -77.028333},
        {lat: -12.045333, lng: -77.034,
          size: 'small'},
        {lat: -12.045633, lng: -77.022,
          color: 'blue'}
      ]
    });

    var img2 = $('<img/>').attr('src', url2)
    $staticMap2.append(img2);

  });

    
};

Template.GoogleMaps.events({
  'submit #geocoding_form': function (e, tmpl) {
    e.preventDefault();
    tmpl.GMaps.geocode({
      address: $('#address').val().trim(),
      callback: function(results, status){
        if(status=='OK'){
          var latlng = results[0].geometry.location;
          tmpl.mapGeocoding.setCenter(latlng.lat(), latlng.lng());
          tmpl.mapGeocoding.addMarker({
            lat: latlng.lat(),
            lng: latlng.lng()
          });
        }
      }
    });
  }
});