TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);



TabularTables.ClosedOrders = new Tabular.Table({
	name: "ClosedOrders",
	collection: Orders,
	pub: "tabular_Orders",
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
		},
		{
			tmpl: Meteor.isClient && Template.orderHistoryViewOrderCell
		}
	]
});



TabularTables.OpenOrders = new Tabular.Table({
	name: "OpenOrders",
	collection: Orders,
	pub: "tabular_Orders",
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
			title: "Type",
			tmpl: Meteor.isClient && Template.orderTypeCell
		},
		{
			title: "Reservation",
			tmpl: Meteor.isClient && Template.patronReservationCell
		},
		{
			data: "status",
			title: "Status",
			tmpl: Meteor.isClient && Template.orderStatusCell
		}
	]
});