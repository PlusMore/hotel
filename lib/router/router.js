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