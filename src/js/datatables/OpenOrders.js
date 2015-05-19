TabularTables.OpenOrders = new Tabular.Table({
  name: "OpenOrders",
  collection: Orders,
  pub: "tabular_Orders",
  autoWidth: true,
  searching: false,
  pageLength: 10000,
  lengthChange: false,
  order: [0, 'desc'],
  // https://datatables.net/reference/option/dom
  // removing 'p' removes pagination buttons
  // see link for ways to manipulate datatable appearance
  dom: 'lfr<"table-responsive"t>i',
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
