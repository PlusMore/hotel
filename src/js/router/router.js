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
  controller: "HotelRequiredController"
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
  controller: "HotelRequiredController"
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
  controller: "HotelRequiredController"
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
  controller: "HotelRequiredController"
});

Router.route('/stays/history', function() {
  this.render('StayHistory', {});
}, {
  name: "Stays.History",
  controller: "HotelRequiredController"
});

Router.route('/stays/upcoming', function() {
  this.render('UpcomingStays', {});
}, {
  name: "Stays.Upcoming",
  controller: "HotelRequiredController"
});

// HOTEL
Router.route('/hotel/settings', function() {
  this.render('HotelSettings', {});
}, {
  name: "Hotel.Settings",
  controller: "HotelRequiredController"
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
  controller: "HotelRequiredController"
});

// SERVICES
Router.route('/config-services/amenities', function() {
  this.render('ConfigAmenities', {});
}, {
  name: "Services.ConfigAmenities",
  controller: "HotelRequiredController"
});

Router.route('/config-services/room-service', function() {
  this.render('ConfigRoomService', {});
}, {
  name: "Services.ConfigRoomService",
  controller: "HotelRequiredController",
  data: function() {
    return {
      configuration: HotelServices.findOne({
        hotelId: Session.get('hotelId'),
        type: 'roomService'
      })
    };
  }
});

Router.route('/config-services/add-services', function() {
  this.render('AddServices', {});
}, {
  name: "Services.AddServices",
  controller: "HotelRequiredController"
});

Router.route('/config-services/room-service/edit-menu-category/:_id', function() {
  this.render('EditMenuCategory', {});
}, {
  name: "Services.ConfigRoomService.EditMenuCategory",
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

Router.route('/config-services/:_id', function() {
  this.render('ConfigService', {});
}, {
  name: "Services.ConfigService",
  controller: "HotelRequiredController",
  data: function() {
    return {
      hotelService: HotelServices.findOne(this.params._id)
    };
  }
});
