/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

// Filters

var filters = {
  baseSubscriptions: function() {
    this.subscribe('userHotelData').wait();
  },
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), ['admin']);
  },
  isHotelStaff: function() {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-staff', 'admin']);
  },
  isHotelManager: function (argument) {
    return Roles.userIsInRole(Meteor.userId(), ['hotel-manager', 'admin']);
  }
};


Router.onBeforeAction('loading');

// Routes

Router.map(function() {

  // Manager
  this.route('manageHotelUsers', {
    path: 'manage-hotel-users',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', Session.get('hotelId')),
        Meteor.subscribe('hotelUsers', Session.get('hotelId'))
      ];
    }
  });

  this.route('addHotelStaff', {
    path: '/add-hotel-staff',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', Session.get('hotelId')),
        Meteor.subscribe('hotelUsers', Session.get('hotelId'))
      ];
    },
    data: function() {
      return {
        hotel: Hotels.findOne(Session.get('hotelId'))
      }
    }
  });

  this.route('customizeHotelDevices', {
    path: "/customize-devices",
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', Session.get('hotelId'))
      ];
    } 
  });

  this.route('hotelServices', {
    path: '/hotel-services',
    controller: 'HotelServicesController',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', Session.get('hotelId'))
      ]
    }
  });

  this.route('configureBellService', {
    path: '/hotel-services/bell-service',
    controller: 'HotelServicesController',
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

  this.route('configureRoomService', {
    path: '/hotel-services/room-service',
    controller: 'HotelServicesController',
    waitOn: function() {
      return [
        Meteor.subscribe('hotel', Session.get('hotelId')),
        Meteor.subscribe('hotelService', 'roomService', Session.get('hotelId')),
        // TODO: Refactor to allow for multiple menus
        Meteor.subscribe('hotelMenu', Session.get('hotelId'))
      ];
    },
    data: function() {
      return {
        configuration: HotelServices.findOne({hotelId: Session.get('hotelId'), type: 'roomService'})
      };
    }
  });

  this.route('configureHouseKeeping', {
    path: '/hotel-services/house-keeping',
    controller: 'HotelServicesController',
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

  this.route('configureTransportation', {
    path: '/hotel-services/transportation',
    controller: 'HotelServicesController',
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

  this.route('configureValetServices', {
    path: '/hotel-services/valet-services',
    controller: 'HotelServicesController',
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

  this.route('configureWakeUpCall', {
    path: '/hotel-services/wake-up-call',
    controller: 'HotelServicesController',
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

  // Staff
  this.route('devices', {
    path: '/devices',
    waitOn: function() {
      return [
        Meteor.subscribe('devicesForHotel', Session.get('hotelId'))
      ];
    },
    data: function () {
      return {
        devices: Devices.find({hotelId: Session.get('hotelId')})
      };
    }
  });

  this.route('device', {
    path: '/device/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('deviceUserStatus', this.params._id)
      ];
    },
    data: function () {
      return {
        device: Devices.findOne(this.params._id),
        users: Meteor.users.find({deviceId: this.params._id}, {sort: {'status.lastLogin': -1}})
      };
    } 
  });

  this.route('patronOrders', {
    path: '/orders',
    template: 'patronOrders',
    waitOn: function () {
      return [
        Meteor.subscribe('openPatronOrders', Session.get('hotelId'))
      ];
    } 
  });

  this.route('request', {
    path: '/request/:_id',
    template: 'patronOrderPage',
    waitOn: function() {
      return [
        Meteor.subscribe('patronOrder', this.params._id)
      ];
    },
    data: function() {
      var order = Orders.findOne(this.params._id);
      if (order) {
        var experience = Experiences.findOne(order.reservation.experienceId)
        return {
          order: order,
          experience: experience
        };
      }
    }
  });

  // Pages

  this.route('homepage', {
    path: '/'
  });

  // Dashboard

  this.route('dashboard', {
    path: '/dashboard',
    waitOn: function() {
      if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        return [
          Meteor.subscribe('hotels')
        ];
      }
    }
  });

});
