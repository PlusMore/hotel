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

HotelServices.validateServiceType = function(serviceType) {
  var friendlyServiceType = HotelServices.friendlyServiceType(serviceType);

  if (friendlyServiceType === undefined) {
    throw new Meteor.Error(500, serviceType + ' is not a known service type');
  }

  return !!friendlyServiceType;
};

HotelServices.friendlyServiceType = function(serviceType) {
  switch (serviceType) {
    case 'transportation':
      return 'Transportation';
    case 'bellService': 
      return 'Luggage Pickup';
    case 'houseKeeping': 
      return 'House Keeping';
    case 'wakeUpCall': 
      return 'Wake Up Call';
    case 'valetServices': 
      return 'Valet Services';
    case 'roomService':
      return 'Room Service';
    default: 
      return undefined;
  }
};

Schema.configureService = new SimpleSchema({
  _id: {
    type: String
  },
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
  },
  allowTips: {
    type: Boolean,
    label: "Allow Tipping?"
  }
});

Meteor.methods({
  activateHotelService: function(serviceType, hotelId) {
    // validate service type
    check(serviceType, String);
    HotelServices.validateServiceType(serviceType);

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
    HotelServices.validateServiceType(serviceType);

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
  },
  configureService: function(serviceConfiguration) {
    check(serviceConfiguration, Schema.configureService);

    return HotelServices.update(serviceConfiguration._id, {
      $set: _.omit(serviceConfiguration, '_id')
    });
  },
  resetServiceAvailability: function(serviceId) {
    check(serviceId, String);

    return HotelServices.update(
      serviceId, 
      {
        $set: {
          startTime: undefined,
          endTime: undefined,
          startMinutes: undefined,
          endMinutes: undefined
        }
      } 
    );
  }
});