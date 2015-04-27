Router.configure({
  layoutTemplate: 'AppLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

HotelRequiredController = RouteController.extend({
  onBeforeAction: function() {
    if (Session.get('hotelId')) {
      this.next();
    } else {
      this.render('HotelRequired');
    }
  }
});

Router.route('/', function() {
  this.render('Dashboard', {});
}, {
  name: 'Dashboard',
  waitOn: function() {
    var hotelId = Session.get('hotelId');
    if (hotelId) {
      return [
        Meteor.subscribe('dashboardWidgetInfo', hotelId)
      ];
    }
  },
  subscriptions: function() {
    this.subscribe('roomsAndActiveStays', Session.get('hotelId'), Session.get('currentTime'));
  },
  onBeforeAction: function() {
    if (Session.get('hotelId')) {
      this.next();
    } else {
      this.render('AdminDashboard');
    }
  }
});

Router.route('/account', function() {
  this.render('Account', {});
}, {
  name: "Account"
});

// CHECK-IN
Router.route('/guest/check-in', function() {
  this.render('CheckIn', {});
}, {
  name: "Guest.CheckIn",
  controller: "HotelRequiredController",
  subscriptions: function() {
    this.subscribe('roomsAndActiveStays', Session.get('hotelId'), Session.get('currentTime'));
  }
});

// ORDERS
Router.route('/orders/', function() {
  this.render('OpenOrders', {});
}, {
  name: "Orders.Open",
  controller: "HotelRequiredController"
});

Router.route('/orders/history', function() {
  this.render('OrderHistory', {});
}, {
  name: "Orders.History",
  controller: "HotelRequiredController"
});

// DEVICES
Router.route('/devices/', function() {
  this.render('ViewDevices', {});
}, {
  name: "Devices.View",
  controller: "HotelRequiredController"
});

Router.route('/devices/config', function() {
  this.render('ConfigureDevices', {});
}, {
  name: "Devices.Configure",
  controller: "HotelRequiredController",
  waitOn: function() {
    return Meteor.subscribe('hotel', Session.get('hotelId'));
  }
});

// ROOMS
Router.route('/rooms/', function() {
  this.render('ViewRooms', {});
}, {
  name: "Rooms.View",
  controller: "HotelRequiredController"
});

Router.route('/rooms/config', function() {
  this.render('ConfigureRooms', {});
}, {
  name: "Rooms.Configure",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('roomNames', Session.get('hotelId'))
    ];
  }
});

// STAYS
Router.route('/stays/preregister', function() {
  this.render('PreregisterStay', {});
}, {
  name: "Stays.Preregister",
  controller: "HotelRequiredController"
});

Router.route('/stays/', function() {
  this.render('ViewStays', {});
}, {
  name: "Stays.View",
  controller: "HotelRequiredController",
  onBeforeAction: function() {
    forceReRender();
    this.next();
  }
});

Router.route('/stays/history', function() {
  this.render('StayHistory', {});
}, {
  name: "Stays.History",
  controller: "HotelRequiredController",
  onBeforeAction: function() {
    forceReRender();
    this.next();
  }
});

Router.route('/stays/upcoming', function() {
  this.render('UpcomingStays', {});
}, {
  name: "Stays.Upcoming",
  controller: "HotelRequiredController",
  onBeforeAction: function() {
    forceReRender();
    this.next();
  }
});

// HOTEL
Router.route('/hotel/settings', function() {
  this.render('HotelSettings', {});
}, {
  name: "Hotel.Settings",
  controller: "HotelRequiredController",
  waitOn: function() {
    return Meteor.subscribe('hotel', Session.get('hotelId'));
  }
});

// STAFF
Router.route('/staff/', function() {
  this.render('ViewStaff', {});
}, {
  name: "Staff.View",
  controller: "HotelRequiredController"
});

Router.route('/staff/add', function() {
  this.render('AddNewUser', {});
}, {
  name: "Staff.AddNewUser",
  controller: "HotelRequiredController"
});

Router.route('/staff/groups', function() {
  this.render('ManageGroups', {});
}, {
  name: "Staff.Groups",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('groups', Session.get('hotelId')),
      Meteor.subscribe('hotelUsers', Session.get('hotelId'))
    ];
  }
});

// SERVICES
Router.route('/config-services/amenities', function() {
  this.render('ConfigAmenities', {});
}, {
  name: "Services.ConfigAmenities",
  controller: "HotelRequiredController",
  waitOn: function() {
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
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'roomService', Session.get('hotelId')),
      Meteor.subscribe('hotelMenu', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'roomService'
      })
    };
  }
});

Router.route('/config-services/room-service/edit-menu-category/:_id', function() {
  this.render('EditMenuCategory', {});
}, {
  name: "Services.ConfigRoomService.EditMenuCategory",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'roomService', Session.get('hotelId')),
      Meteor.subscribe('hotelMenu', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      serviceConfiguration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'roomService'
      }),
      menuCategory: MenuCategories.findOne(this.params._id)
    };
  }
});

Router.route('/config-services/house-keeping', function() {
  this.render('ConfigHouseKeeping', {});
}, {
  name: "Services.ConfigHouseKeeping",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'houseKeeping', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'houseKeeping'
      })
    };
  }
});

Router.route('/config-services/transportation', function() {
  this.render('ConfigTransportation', {});
}, {
  name: "Services.ConfigTransportation",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'transportation', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'transportation'
      })
    };
  }
});

Router.route('/config-services/wake-up-call', function() {
  this.render('ConfigWakeUpCall', {});
}, {
  name: "Services.ConfigWakeUpCall",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'wakeUpCall', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'wakeUpCall'
      })
    };
  }
});

Router.route('/config-services/bell-service', function() {
  this.render('ConfigBellService', {});
}, {
  name: "Services.ConfigBellService",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'bellService', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'bellService'
      })
    };
  }
});

Router.route('/config-services/valet', function() {
  this.render('ConfigValet', {});
}, {
  name: "Services.ConfigValet",
  controller: "HotelRequiredController",
  waitOn: function() {
    return [
      Meteor.subscribe('hotel', Session.get('hotelId')),
      Meteor.subscribe('hotelService', 'valetServices', Session.get('hotelId'))
    ];
  },
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'valetServices'
      })
    };
  }
});
