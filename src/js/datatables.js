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
    'status',
    'requestedDate',
    'requestedZone',
    'receivedDate',
    'receivedBy',
    'deviceId',
    'userId',
    'handledBy',
    'service',
    'purchase',
    'reservation'
  ],
  columns: [{
    data: "orderRequestedWhen()",
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
    data: "orderServiceType()",
    title: "Type",
    tmpl: Meteor.isClient && Template.orderHistoryTypeCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    data: "orderStatus()",
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
    'status',
    'requestedDate',
    'requestedZone',
    'receivedDate',
    'receivedBy',
    'deviceId',
    'userId',
    'handledBy',
    'service',
    'purchase',
    'reservation'
  ],
  columns: [{
    data: "orderRequestedWhen()",
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
    data: "orderServiceType()",
    title: "Type",
    tmpl: Meteor.isClient && Template.orderTypeCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    data: "orderReservationColumn()",
    title: "Reservation",
    tmpl: Meteor.isClient && Template.reservationCell,
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        }
      }
    }
  }, {
    data: "orderStatus()",
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
    'stayId'
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


TabularTables.ViewStaff = new Tabular.Table({
  name: "ViewStaff",
  collection: Meteor.users,
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  extraFields: [
    'profile',
    'roles',
    'emails'
  ],
  allow: function(userId) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  columns: [{
    tmpl: Meteor.isClient && Template.staffAvatarCell
  }, {
    data: "userFirstName()",
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
    data: "userLastName()",
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
    data: "userEmail()",
    title: "Contact",
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        } else {
          return '';
        }
      }
    },
    tmpl: Meteor.isClient && Template.staffContactCell
  }, {
    data: "userFriendlyRole()",
    title: "Role",
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        } else {
          return '';
        }
      }
    },
    tmpl: Meteor.isClient && Template.staffRoleCell
  }, {
    tmpl: Meteor.isClient && Template.staffEditCell
  }]
});
