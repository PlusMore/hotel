HotelServices = new Meteor.Collection('hotelServices');
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

HotelServices.friendlyRequestType = function(requestType) {
  switch (requestType) {
    case 'transportation':
      return 'Transportation';
      break;
    case 'bellService': 
      return 'Bell Service';
      break;
    case 'houseKeeping': 
      return 'House Keeping';
      break;
    case 'wakeUpCall': 
      return 'Wake Up Call';
      break;
    case 'valetServices': 
      return 'Valet Services'
      break;
    default: 
      return 'Invalid Type';
      break;
  }
}

Schema.configureServiceAvailabilty = new SimpleSchema({
  startTime: {
    type: String,
    label: 'Start Time',
    optional: true
  },
  endTime: {
    type: String,
    label: 'End Time',
    optional: true
  },
  startMinutes: {
    type: Number,
    optional: true
  },
  endMinutes: {
    type: Number,
    optional: true
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