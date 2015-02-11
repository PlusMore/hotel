Router.configure({
  layoutTemplate: 'AppLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: '404'
});

Router.route('/', function () {
  this.render('Dashboard', {});
	},{
  name: 'Dashboard'
});

Router.route('/account', function() {
	this.render('Account', {});
},{
	name: "Account"
});

Router.route('/account/settings', function() {
	this.render('AccountSettings', {});
},{
	name: "Account.Settings"
});

Router.route('/orders/open', function() {
	this.render('OpenOrders', {});
},{
	name: "Orders.Open"
});

Router.route('/orders/history', function() {
	this.render('OrderHistory', {});
},{
	name: "Orders.History"
});

Router.route('/devices/view', function() {
	this.render('ViewDevices', {});
},{
	name: "Devices.View"
});

Router.route('/devices/config', function() {
	this.render('ConfigureDevices', {});
},{
	name: "Devices.Configure"
});

Router.route('/staff/view', function() {
	this.render('ViewStaffUsers', {});
},{
	name: "Staff.View"
});

Router.route('/staff/add', function() {
	this.render('AddNewUser', {});
},{
	name: "Staff.AddNewUser"
});

Router.route('/config-services/amenities', function() {
	this.render('ConfigAmenities', {});
},{
	name: "Services.ConfigAmenities"
});

Router.route('/config-services/room-service', function() {
	this.render('ConfigRoomService', {});
},{
	name: "Services.ConfigRoomService"
});

Router.route('/config-services/house-keeping', function() {
	this.render('ConfigHouseKeeping', {});
},{
	name: "Services.ConfigHouseKeeping"
});

Router.route('/config-services/transportation', function() {
	this.render('ConfigTransportation', {});
},{
	name: "Services.ConfigTransportation"
});

Router.route('/config-services/wake-up-call', function() {
	this.render('ConfigWakeUpCall', {});
},{
	name: "Services.ConfigWakeUpCall"
});

Router.route('/config-services/bell-service', function() {
	this.render('ConfigBellService', {});
},{
	name: "Services.ConfigBellService"
});

Router.route('/config-services/valet', function() {
	this.render('ConfigValet', {});
},{
	name: "Services.ConfigValet"
});