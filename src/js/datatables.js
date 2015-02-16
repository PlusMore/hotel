TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);



TabularTables.OrderHistory = new Tabular.Table({
  name: "OrderHistory",
  collection: Orders,
  pub: "tabular_Orders",
  searching: false,
  autoWidth: true,
  pagingType: "simple",
  order: [0, 'desc'],
  extraFields: [
    'requestedZone',
    'receivedDate',
    'receivedBy',
    'completedBy',
    'completedDate',
    'deviceId',
    'userId',
    'handledBy',
    'service',
    'purchase',
    'reservation'
  ],
  columns: [{
    data: "requestedDate",
    title: "Requested",
    tmpl: Meteor.isClient && Template.orderHistoryRequestedCell
  }, {
    data: "type",
    title: "Type",
    tmpl: Meteor.isClient && Template.orderHistoryTypeCell
  }, {
    data: "status",
    title: "Status",
    tmpl: Meteor.isClient && Template.orderHistoryStatusCell
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
  order: [0, 'desc'],
  extraFields: [
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
    data: "requestedDate",
    title: "When",
    tmpl: Meteor.isClient && Template.requestedTimeAgoCell
  }, {
    data: "type",
    title: "Order Type",
    tmpl: Meteor.isClient && Template.orderTypeCell
  }, {
    title: "Reservation",
    tmpl: Meteor.isClient && Template.reservationCell
  }, {
    data: "status",
    title: "Status",
    tmpl: Meteor.isClient && Template.orderStatusCell
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
  order: [0, 'asc'],
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
