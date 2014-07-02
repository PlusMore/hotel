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
  isLoggedIn: function(pause, router, extraCondition) {
    if (! Meteor.user()) {
      if (Meteor.loggingIn()) {
        router.render(this.loadingTemplate);
      }
      else {
        Session.set('fromWhere', router.path)
        // this.render('entrySignIn');
        var path = Router.routes['entrySignIn'].path();
        Router.go(path);
      }
      pause()
    }
  },
  isLoggedOut: function(pause) {
    if (Meteor.user()) {
      pause();
      Router.go('dashboard');
    }
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

var helpers = {
  showLoadingBar: function(pause) {
    if (this.ready()) {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }
};
Router.onBeforeAction('loading');
Router.onBeforeAction(filters.baseSubscriptions);

// Show loading bar for any route that loads a subscription
Router.onBeforeAction(helpers.showLoadingBar, {only: []});

// Routes

Router.map(function() {

  // Manager
  this.route('manageHotelUsers', {
    path: 'manage-hotel-users',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelManager());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('hotelUsers')
      ]
    }
  });

  this.route('addHotelStaff', {
    path: 'add-hotel-staff',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelManager());
    },
    waitOn: function() {
      return [
        Meteor.subscribe('hotelUsers')
      ]
    }
  });

  // Staff
  this.route('devices', {
    path: '/devices',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelStaff());
    },
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

  this.route('openPatronOrders', {
    path: 'open-patron-orders',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelStaff());
    },
    waitOn: function () {
      return [
        Meteor.subscribe('openPatronOrders')
      ]
    } 
  });

  this.route('patronOrderPage', {
    path: 'patron-order/:_id',
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this, filters.isHotelStaff());
    },
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
    onBeforeAction: function(pause) {
      filters.isLoggedIn(pause, this);
    }
  });

});
