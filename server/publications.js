/* ---------------------------------------------------- +/

## Publications ##

All publications-related code.

/+ ---------------------------------------------------- */

Meteor.publish('userHotelData', function() {
  var userId = this.userId;

  if (userId) {
    var fields = {
        hotelId: 1,
        emails: 1,
        profile: 1,
      },
      user = Meteor.users.findOne({
        _id: userId
      }),
      hotelId = user && user.hotelId || null;
    if (hotelId) {
      return [
        Meteor.users.find({
          _id: userId
        }, {
          fields: fields
        }),
        Hotels.find({
          _id: hotelId
        })
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

Meteor.publish('hotelsAdminSelect', function() {
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Hotels.find({}, {
      fields: {
        _id: 1,
        name: 1
      },
      sort: {
        name: 1
      }
    });
  }
});

// Tags

Meteor.publish('tags', function(collectionName) {
  return Meteor.tags.find({
    collection: collectionName
  });
});

Meteor.publish('dashboardWidgetInfo', function(hotelId) {
  var now = new Date();

  Counts.publish(this, 'total-active-stays', Stays.find({
    hotelId: hotelId,
    checkInDate: {
      $lte: now
    },
    checkoutDate: {
      $gte: now
    },
    zone: {
      $exists: true
    }
  }), {
    noReady: true,
    nonReactive: true
  });

  Counts.publish(this, 'total-rooms', Rooms.find({
    hotelId: hotelId
  }), {
    noReady: true,
    nonReactive: true
  });

  Counts.publish(this, 'open-orders', Orders.find({
    hotelId: hotelId,
    open: true,
    handledBy: 'hotel'
  }), {
    noReady: true
  });

  return Hotels.find({
    _id: hotelId
  }, {
    fields: {
      geo: 1
    }
  });

});

// Devices
Meteor.publish('devicesForHotel', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;

  return Devices.find({
    hotelId: hotelId
  }, {
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
    Meteor.users.find({
      deviceId: deviceId
    }, {
      fields: {
        emails: 1,
        deviceId: 1,
        profile: 1,
        status: 1
      }
    })
  ];
});

Meteor.publish('hotel', function(id) {
  return Hotels.find(id);
});

Meteor.publish('roomNames', function(hotelId) {
  return Rooms.find({
    hotelId: hotelId
  }, {
    fields: {
      _id: 1,
      hotelId: 1,
      name: 1
    }
  });
});

Meteor.publish('hotelUsers', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  return Meteor.users.find({
    hotelId: hotelId,
    roles: 'hotel-staff'
  }, {
    fields: {
      emails: 1,
      roles: 1,
      hotelId: 1,
      profile: 1
    }
  });
});

Meteor.publish('hotelService', function(serviceType, hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return HotelServices.find({
      hotelId: hotelId,
      type: serviceType
    });
  }
});

Meteor.publish('hotelAmenities', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return HotelAmenities.find({
      hotelId: hotelId
    });
  }
});

Meteor.publish('amenityDetails', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    return AmenityDetails.find({
      hotelId: hotelId
    });
  }
});

Meteor.publish('roomsAndActiveStays', function(hotelId, currentTime) {
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {

    var staysPub = new SimplePublication({
      subHandle: this,
      collection: Stays,
      selector: {
        checkInDate: {
          $lte: currentTime
        },
        checkoutDate: {
          $gte: currentTime
        }
      },
      foreignKey: 'stayId',
      inverted: true
    });

    var publication = new SimplePublication({
      subHandle: this,
      collection: Rooms,
      selector: {
        hotelId: hotelId
      },
      dependant: [
        staysPub
      ]
    }).start();

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
        selector: {
          hotelId: hotelId
        },
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

Meteor.publish('usersForStayId', function(stayId) {
  var stay = Stays.findOne(stayId);

  return Meteor.users.find({
    _id: {
      $in: stay.users
    }
  });
});

Meteor.publish("tabular_Orders", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  var ordersCursor = Orders.find({_id: {$in: ids}},fields);

  var userIds = [];
  var roomIds = [];

  ordersCursor.map(function(order){
    if (!_.contains(userIds,order.userId)){
      userIds.push(order.userId);
    }
    if (!_.contains(userIds,order.receivedBy)){
      userIds.push(order.receivedBy);
    }
    if (!_.contains(userIds,order.cancelledBy)){
      userIds.push(order.cancelledBy);
    }
    if (!_.contains(userIds,order.completedBy)){
      userIds.push(order.completedBy);
    }
    if (!_.contains(roomIds,order.roomId)){
      roomIds.push(order.roomId);
    }
  })

  var usersCursor = Meteor.users.find({_id: {$in: userIds}});
  var roomsCursor = Rooms.find({_id: {$in: roomIds}});

  return [
    ordersCursor,
    usersCursor,
    roomsCursor
  ];
});

Meteor.publish("tabular_Devices", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  // get stays that match room stayIds
  var staysPub = new SimplePublication({
    subHandle: this,
    collection: Stays,
    foreignKey: 'stayId',
    inverted: true
  });

  // get rooms that match device roomIds
  var roomsPub = new SimplePublication({
    subHandle: this,
    collection: Rooms,
    foreignKey: 'roomId',
    inverted: true,
    dependant: [
      staysPub
    ]
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Devices,
    selector: {
      _id: {
        $in: ids
      }
    },
    fields: fields,
    dependant: [
      roomsPub,
      staysPub
    ]
  }).start();
});

Meteor.publish("tabular_Stays", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  var usersPub = new SimplePublication({
    subHandle: this,
    collection: Meteor.users,
    foreignKey: 'guestId',
    inverted: true
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Stays,
    selector: {
      _id: {
        $in: ids
      }
    },
    fields: fields,
    dependant: [
      usersPub
    ]
  }).start();
});

Meteor.publish("tabular_Rooms", function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  // users by guestId in stay
  var usersPub = new SimplePublication({
    subHandle: this,
    collection: Meteor.users,
    foreignKey: 'guestId',
    inverted: true
  });

  // stays by stayId in room
  var staysPub = new SimplePublication({
    subHandle: this,
    collection: Stays,
    foreignKey: 'stayId',
    inverted: true,
    dependant: [
      usersPub
    ]
  });

  var publication = new SimplePublication({
    subHandle: this,
    collection: Rooms,
    selector: {
      _id: {
        $in: ids
      }
    },
    options: {
      $sort: {
        name: 1
      }
    },
    fields: fields,
    dependant: [
      staysPub,
      usersPub
    ]
  }).start();

});

Meteor.publish('patronOrder', function(id) {
  var order = Orders.findOne(id);
  return [
    Orders.find(id),
    Experiences.find(order.reservation.experienceId)
  ];
});
