TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.OpenOrders = new Tabular.Table({
	name: "Orders",
	collection: Orders,
	columns: [
		{
			data: "requestedDate", 
			title: "Requested",
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
		},
		{
			tmpl: Meteor.isClient && Template.orderStatusButtonsCell
		}

	]
});