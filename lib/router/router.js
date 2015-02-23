Router.configure({
  layoutTemplate: 'AppLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: '404'
});

Router.route('/', function() {
  this.render('Dashboard', {});
}, {
  name: 'Dashboard'
});

Router.route('/account', function() {
  this.render('Account', {});
}, {
  name: "Account"
});

Router.route('/account/settings', function() {
  this.render('AccountSettings', {});
}, {
  name: "Account.Settings"
});

// ORDERS
Router.route('/orders/open', function() {
  this.render('OpenOrders', {});
}, {
  name: "Orders.Open"
});

Router.route('/orders/history', function() {
  this.render('OrderHistory', {});
}, {
  name: "Orders.History"
});

// DEVICES
Router.route('/devices/view', function() {
  this.render('ViewDevices', {});
}, {
  name: "Devices.View"
});

Router.route('/devices/config', function() {
  this.render('ConfigureDevices', {});
}, {
  name: "Devices.Configure",
  waitOn: function() {
    return Meteor.subscribe('hotel', Session.get('hotelId'));
  }
});

// HOTEL
Router.route('/hotel/settings', function() {
  this.render('HotelSettings', {});
}, {
  name: "Hotel.Settings",
  waitOn: function() {
    return Meteor.subscribe('hotel', Session.get('hotelId'));
  }
});

// STAFF
Router.route('/staff/view', function() {
  this.render('ViewStaff', {});
}, {
  name: "Staff.View"
});

Router.route('/staff/add', function() {
  this.render('AddNewUser', {});
}, {
  name: "Staff.AddNewUser"
});

// SERVICES
Router.route('/config-services/amenities', function() {
  this.render('ConfigAmenities', {});
}, {
  name: "Services.ConfigAmenities",
  waitOn: function () {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelAmenities', Session.get('hotelId')),
      Meteor.subscribe('amenityDetails', Session.get('hotelId'))
    ];
  }
});

Router.route('/config-services/room-service', function() {
  this.render('ConfigRoomService', {});
}, {
  name: "Services.ConfigRoomService",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'roomService', Session.get('hotelId')),
      Meteor.subscribe('hotelMenu', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'roomService'})
    };
  }
});

Router.route('/config-services/house-keeping', function() {
  this.render('ConfigHouseKeeping', {});
}, {
  name: "Services.ConfigHouseKeeping",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'houseKeeping', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'houseKeeping'})
    };
  }
});

Router.route('/config-services/transportation', function() {
  this.render('ConfigTransportation', {});
}, {
  name: "Services.ConfigTransportation",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'transportation', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'transportation'})
    };
  }
});

Router.route('/config-services/wake-up-call', function() {
  this.render('ConfigWakeUpCall', {});
}, {
  name: "Services.ConfigWakeUpCall",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'wakeUpCall', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'wakeUpCall'})
    };
  }
});

Router.route('/config-services/bell-service', function() {
  this.render('ConfigBellService', {});
}, {
  name: "Services.ConfigBellService",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'bellService', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'bellService'})
    };
  }
});

Router.route('/config-services/valet', function() {
  this.render('ConfigValet', {});
}, {
  name: "Services.ConfigValet",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'valetServices', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'valetServices'})
    };
  }
});
