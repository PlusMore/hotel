TabularTables.OrderHistory = new Tabular.Table({
  name: "OrderHistory",
  collection: Orders,
  pub: "tabular_Orders",
  searching: false,
  autoWidth: true,
  pagingType: "simple",
  order: [
    [0, 'desc']
  ],
  // https://datatables.net/reference/option/dom
  // removing 'p' removes pagination buttons
  // see link for ways to manipulate datatable appearance
  dom: 'fr<"table-responsive"t>ipl',
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
