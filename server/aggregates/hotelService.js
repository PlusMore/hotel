// TODO: when we have a UI for this, we can set any service we create to be
// clonable by setting plusmore: true

Meteor.startup(function() {

  var plusmoreHotelServices = HotelServices.find({
    plusmore: true
  });

  if (plusmoreHotelServices.count() === 0) {
    var insertServices = [{
      type: 'roomService',
      displayName: 'Room Service'
    }, {
      type: 'transportation',
      displayName: 'Transportation'
    }, {
      type: 'bellService',
      displayName: 'Luggage Pickup'
    }, {
      type: 'houseKeeping',
      displayName: 'House Keeping'
    }, {
      type: 'wakeUpCall',
      displayName: 'Wake Up Call'
    }, {
      type: 'valetServices',
      displayName: 'Valet Services'
    }]

    _.each(insertServices, function(service) {
      console.log('inserting clonable service:', service.displayName);
      HotelServices.insert(_.extend(service, {
        plusmore: true,
        clonable: true
      }));
    });
  }

});
