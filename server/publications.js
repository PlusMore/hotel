/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

Meteor.publish('userHotelData', function () {
  var userId = this.userId;

  if (userId) {
    var fields = {hotelId:1},
      user = Meteor.users.findOne({_id:userId}),
      hotelId = user && user.hotelId || null;
    if (hotelId) {
      return [
        Meteor.users.find({_id: userId}, {fields: fields}),
        Hotels.find({_id: hotelId})
      ];
    } else {
      this.ready();
      return null;
    }
  } else {
    this.ready();
    return null;
  }
});

// Tags

Meteor.publish('tags', function(collectionName) {
  return Meteor.tags.find({collection: collectionName});
});

// Devices
Meteor.publish('devicesForHotel', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;

  return Devices.find({hotelId: hotelId}, {
    fields: {
      location: 1,
      hotelId: 1,
      _id: 1
    },
    sort: {
      location: 1
    }
  });
});

// User Status
Meteor.publish('deviceUserStatus', function(deviceId) {
  return [
    Devices.find(deviceId),
    Meteor.users.find({deviceId: deviceId}, {
      fields: {
        emails:1,
        deviceId: 1,
        profile: 1,
        status:1
      }
    })
  ];
});

Meteor.publish('hotel', function(id) {
  return Hotels.find(id);
});

Meteor.publish('hotels', function () {
  return Hotels.find();
});

Meteor.publish('hotelUsers', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  return Meteor.users.find({hotelId: hotelId, roles: 'hotel-staff'}, {fields:{emails:1, roles:1, hotelId:1, profile:1}});
});

Meteor.publish('hotelService', function(serviceType, hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);
      
  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return HotelServices.find({hotelId: hotelId, type: serviceType});
  }
});

Meteor.publish('hotelAmenities', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return HotelAmenities.find({hotelId: hotelId});
  }
});

Meteor.publish('amenityDetails', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return AmenityDetails.find({hotelId: hotelId});
  }
});

Meteor.publish('hotelMenu', function(hotelId) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);
      
  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    var hotel = Hotels.find(hotelId);
    if (hotel) {

      var publication = new SimplePublication({
        subHandle: this,
        collection: MenuCategories,
        selector: {hotelId: hotelId},
        dependant: new SimplePublication({
          subHandle: this,
          collection: MenuItems,
          foreignKey: 'menuCategoryId'
        })
      }).start();
    }
  }
});

Meteor.publish('menuItem', function(id) {
  var userId = this.userId,
      user = Meteor.users.findOne(userId);
      
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    var menuItem = MenuItems.findOne(id);
    if (menuItem) {
      return [
        MenuItems.find(id),
        MenuCategories.find(menuItem.menuCategoryId) 
      ];
    }
  }
});

// Orders
Meteor.publish("openPatronOrders", function(hotelId) {
  // join device from each order
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  if (user) {
    hotelId = hotelId || user.hotelId;

    if (hotelId) {
      hotel = Hotels.findOne(hotelId);


      if (hotel) {
        // return [
        //   Orders.find({hotelId: hotelId}),
        // ];

        var devicesPub = new SimplePublication({
          subHandle: this,
          collection: Devices,
          foreignKey: 'deviceId',
          inverted: true
        });

        var usersPub = new SimplePublication({
          subHandle: this,
          collection: Meteor.users,
          foreignKey: 'userId',
          inverted: true
        });

        var publication = new SimplePublication({
          subHandle: this,
          collection: Orders,
          selector: {hotelId: hotelId, open: true, handledBy: 'hotel'},
          dependant: [
            devicesPub,
            usersPub
          ]
        }).start();
      } 
    }
  }
});

Meteor.publish("historyPatronOrders", function(hotelId) {
  // join device from each order
  var userId = this.userId,
      user = Meteor.users.findOne(userId);

  if (user) {
    hotelId = hotelId || user.hotelId;

    if (hotelId) {
      hotel = Hotels.findOne(hotelId);


      if (hotel) {
        // return [
        //   Orders.find({hotelId: hotelId}),
        // ];

        var publication = new SimplePublication({
          subHandle: this,
          collection: Orders,
          selector: {hotelId: hotelId, open: false, handledBy: 'hotel'},
          dependant: new SimplePublication({
            subHandle: this,
            collection: Devices,
            foreignKey: 'deviceId',
            inverted: true
          })
        }).start();
      } 
    }
  }
});

Meteor.publish('patronOrder', function(id) {
  var order = Orders.findOne(id);
  return [
    Orders.find(id),
    Experiences.find(order.reservation.experienceId)
  ];
});