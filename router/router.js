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
        Meteor.subscribe('hotelUsers')
      ]
    }
  });

  this.route('addHotelStaff', {
    path: '/add-hotel-staff',
    waitOn: function() {
      return [
        Meteor.subscribe('hotelUsers')
      ]
    }
  });

  this.route('customizeHotelDevices', {
    path: "/customize-devices"
  });

  // Staff
  this.route('devices', {
    path: '/devices',
    waitOn: function() {
      return [
        Meteor.subscribe('devicesForHotel')
      ]
    },
    data: function () {
      return {
        devices: Devices.find({hotelId: Meteor.user().hotelId})
      }
    }
  });

  this.route('device', {
    path: '/device/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('deviceUserStatus', this.params._id)
      ]
    },
    data: function () {
      return {
        device: Devices.findOne(this.params._id),
        users: Meteor.users.find({deviceId: this.params._id}, {sort: {'status.lastLogin': -1}})
      }
    } 
  });

  this.route('openPatronOrders', {
    path: '/open-patron-orders',
    waitOn: function () {
      return [
        Meteor.subscribe('openPatronOrders')
      ]
    } 
  });

  this.route('patronOrderPage', {
    path: '/patron-order/:_id',
    waitOn: function() {
      return [
        Meteor.subscribe('patronOrder', this.params._id)
      ]
    },
    data: function() {
      var order = Orders.findOne(this.params._id);
      if (order) {
        var experience = Experiences.findOne(order.reservation.experienceId)
        return {
          order: order,
          experience: experience
        }
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
  });

});
