TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);



TabularTables.OrderHistory = new Tabular.Table({
  name: "OrderHistory",
  collection: Orders,
  pub: "tabular_Orders",
  searching: false,
  autoWidth: true,
  pagingType: "simple",
  extraFields: [
    'open',
    'type',
    'requestedZone',
    'receivedDate',
    'receivedBy',
    'deviceId',
    'userId',
    'roomId',
    'handledBy',
    'service',
    'purchase',
    'reservation'
  ],
  columns: [{
    data: "requestedDate",
    title: "Requested",
    tmpl: Meteor.isClient && Template.orderHistoryRequestedCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    data: "friendlyServiceType()",
    title: "Type",
    sortable: false,
    tmpl: Meteor.isClient && Template.orderHistoryTypeCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    data: "status",
    title: "Status",
    tmpl: Meteor.isClient && Template.orderHistoryStatusCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    tmpl: Meteor.isClient && Template.orderHistoryViewCell
  }]
});



TabularTables.OpenOrders = new Tabular.Table({
  name: "OpenOrders",
  collection: Orders,
  pub: "tabular_Orders",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  extraFields: [
    'open',
    'type',
    'requestedZone',
    'receivedDate',
    'receivedBy',
    'deviceId',
    'userId',
    'roomId',
    'handledBy',
    'service',
    'purchase',
    'reservation'
  ],
  columns: [{
    data: "requestedDate",
    title: "When",
    tmpl: Meteor.isClient && Template.requestedTimeAgoCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    data: "friendlyServiceType()",
    title: "Type",
    sortable: false,
    tmpl: Meteor.isClient && Template.orderTypeCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    title: "Reservation",
    sortable: false,
    tmpl: Meteor.isClient && Template.reservationCell
  }, {
    data: "status",
    title: "Status",
    tmpl: Meteor.isClient && Template.orderStatusCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    tmpl: Meteor.isClient && Template.viewDetailsCell
  }],
  createdRow: function(row, data, dataIndex) {
    var now = Session.get('currentTime') || new Date();
    var requestedDate = moment(data.requestedDate);
    if (requestedDate.isBefore(moment(now).subtract(20, 'minutes'))) {
      $(row).addClass('danger');
    }
    if (requestedDate.isBefore(moment(now).subtract(10, 'minutes'))) {
      $(row).addClass('warning');
    }
    $(row).addClass('success');
  }
});


TabularTables.ViewDevices = new Tabular.Table({
  name: "ViewDevices",
  collection: Devices,
  pub: "tabular_Devices",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  extraFields: [
    'roomId'
  ],
  columns: [{
    data: "location",
    title: "Location",
    tmpl: Meteor.isClient && Template.viewDevicesLocationCell
  }, {
    title: "Check-in",
    tmpl: Meteor.isClient && Template.viewDevicesCheckinCell
  }, {
    title: "Check-out",
    tmpl: Meteor.isClient && Template.viewDevicesCheckoutCell
  }, {
    tmpl: Meteor.isClient && Template.viewDevicesActionCell
  }],
  createdRow: function(row, data, dataIndex) {
    var stay = Stays.findOne(data.stayId);
    if (stay) {
      var now = Session.get('currentTime') || new Date();
      var checkin = moment(stay.checkInDate);
      var checkout = moment(stay.checkoutDate);
      if (checkin <= now && now <= checkout) {
        $(row).addClass('success');
      }
    }
  }
});


TabularTables.ViewRooms = new Tabular.Table({
  name: "ViewRooms",
  collection: Rooms,
  pub: "tabular_Rooms",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  columns: [
    {
      data: "name",
      title: "Room"
    }, {
      title: "Stay",
      data: "stayId",
      tmpl: Meteor.isClient && Template.RoomActiveStayCell
    }, {
      tmpl: Meteor.isClient && Template.RoomActionsCell
    }
  ]
});

TabularTables.Stays = new Tabular.Table({
  name: "Stays",
  collection: Stays,
  pub: "tabular_Stays",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  extraFields: ['checkInDate', 'checkoutDate', 'zone', 'guestId','users','preReg'],
  language: {
    emptyTable: "There are no stays to display."
  },
  columns: [{
    title: "Room",
    data: "roomName",
    tmpl: Meteor.isClient && Template.StayRoomCell
  }, {
    title: "Check-In",
    tmpl: Meteor.isClient && Template.StayCheckInCell
  }, {
    title: "Check-Out",
    tmpl: Meteor.isClient && Template.StayCheckOutCell
  }, {
    tmpl: Meteor.isClient && Template.ViewStayCell
  }]
});

TabularTables.ViewStaff = new Tabular.Table({
  name: "ViewStaff",
  collection: Meteor.users,
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  extraFields: [
    'roles',
    'emails'
  ],
  allow: function(userId) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  columns: [{
    tmpl: Meteor.isClient && Template.staffAvatarCell
  }, {
    data: "profile.firstName",
    title: "First",
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        } else {
          return '';
        }
      }
    },
    tmpl: Meteor.isClient && Template.staffFirstNameCell
  }, {
    data: "profile.lastName",
    title: "Last",
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        } else {
          return '';
        }
      }
    },
    tmpl: Meteor.isClient && Template.staffLastNameCell
  }, {
    title: "Contact",
    tmpl: Meteor.isClient && Template.staffContactCell
  }, {
    title: "Role",
    tmpl: Meteor.isClient && Template.staffRoleCell
  }, {
    tmpl: Meteor.isClient && Template.staffEditCell
  }]
});
