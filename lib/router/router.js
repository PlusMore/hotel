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