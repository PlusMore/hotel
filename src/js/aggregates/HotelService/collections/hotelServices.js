HotelServices = new Meteor.Collection('hotelServices');
// Allow/Deny

HotelServices.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

HotelServices.helpers({
  hasAssignedGroups: function() {
    return Groups.find({
      hotelId: this.hotelId,
      servicesHandled: this._id
    }).count() > 0;
  },
  assignedGroups: function() {
    return Groups.find({
      hotelId: this.hotelId,
      servicesHandled: this._id
    }, {
      $sort: {
        name: 1
      }
    });
  },
  friendlyServiceType: function() {
    return HotelServices.friendlyServiceType(this.type);
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

HotelServices.clonableServices = function() {
  return HotelServices.find({
    plusmore: true,
    clonable: true
  })
}
