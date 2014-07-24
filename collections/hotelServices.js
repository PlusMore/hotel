HotelServices = new Meteor.Collection('HotelServices');
// Allow/Deny

HotelServices.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove:  function(userId, doc){
    return false;
  }
});

Meteor.methods({
  activateHotelService: function(serviceType, hotelId) {
    // validate service type
    check(serviceType, String);
    switch (serviceType) {

      case 'transportation':      
        break;
      
      case 'bellService':         
        break;
      
      case 'houseKeeping': 
        break;

      case 'wakeUpCall': 
        break;

      case 'valetServices': 
        break;

      default: 
        throw new Meteor.Error(500, serviceType + ' is not a known service type');
        break;

    }

    // validate hotel id
    hotelId = hotelId || Meteor.user().hotelId;
    check(hotelId, String);

    // check to see if valid hotel
    var hotel = Hotels.findOne(hotelId);

    if (hotel) {

      // upsert (insert or update if exists) active hotel service
      return HotelServices.upsert(
        {
          type: serviceType,
          hotelId: hotelId
        }, 
        {$set:{
          type: serviceType,
          hotelId: hotelId,
          active: true
        }}
      );  
    } else {
      throw new Meteor.Error(500, 'Not a valid hotel.');
    }

  },
  deactivateHotelService: function(serviceType, hotelId) {
    // validate service type
    check(serviceType, String);
    switch (serviceType) {

      case 'transportation':       
        break;
      
      case 'bellService':         
        break;
      
      case 'houseKeeping': 
        break;

      case 'wakeUpCall': 
        break;

      case 'valetServices': 
        break;

      default: 
        throw new Meteor.Error(500, serviceType + ' is not a known service type');
        break;

    }

    // validate hotel id
    hotelId = hotelId || Meteor.user().hotelId;
    check(hotelId, String);

    // check to see if valid hotel
    var hotel = Hotels.findOne(hotelId);

    if (hotel) {
      // upsert (insert or update if exists) active hotel service
      var service = HotelServices.findOne({
        type: serviceType,
        hotelId: hotelId
      });

      if (service) {
        return HotelServices.update(service._id, {$set: {active: false}});
      } else {
        throw new Meteor.Error(500, 'No service configured for ' + serviceType);
      }
         
    } else {
      throw new Meteor.Error(500, 'Not a valid hotel.');
    }
  }
});