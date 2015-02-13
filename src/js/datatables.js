TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);



TabularTables.ClosedOrders = new Tabular.Table({
	name: "ClosedOrders",
	collection: Orders,
	pub: "tabular_Orders",
	autoWidth: true,
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
	columns: [
		{
			data: "type",
			title: "Type",
			tmpl: Meteor.isClient && Template.orderHistoryTypeCell
		},
		{
			data: "requestedDate", 
			title: "Date Requested",
			tmpl: Meteor.isClient && Template.orderHistoryRequestedDateCell
		},
		{
			title: "Date Closed",
			tmpl: Meteor.isClient && Template.orderHistoryClosedDateCell
		},
		{
			data: "status",
			title: "Status",
			tmpl: Meteor.isClient && Template.orderHistoryStatusCell
		}
	]
});



TabularTables.OpenOrders = new Tabular.Table({
	name: "OpenOrders",
	collection: Orders,
	pub: "tabular_Orders",
	autoWidth: true,
	searching: false,
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
	columns: [
		{
			data: "requestedDate", 
			title: "When",
			tmpl: Meteor.isClient && Template.requestedTimeAgoCell
		},
		{
			data: "type",
			title: "Order Type",
			tmpl: Meteor.isClient && Template.orderTypeCell
		},
		{
			title: "Reservation",
			tmpl: Meteor.isClient && Template.reservationCell
		},
		{
			data: "status",
			title: "Status",
			tmpl: Meteor.isClient && Template.orderStatusCell
		}
	],
	createdRow: function(row, data, dataIndex){
		var now = Session.get('currentTime') || new Date();
    var requestedDate = moment(data.requestedDate);
    if (requestedDate.isBefore(moment(now).subtract(20, 'minutes'))) {
      $(row).addClass( 'danger' );
    }
    if (requestedDate.isBefore(moment(now).subtract(10, 'minutes'))) {
      $(row).addClass( 'warning' );
    }
    $(row).addClass( 'success' );
	}
});