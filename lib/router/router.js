Router.configure({
  layoutTemplate: 'AppLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: '404'
});

Router.route('/', function () {
  	this.render('dashboard', {});
	},{
  name: 'Dashboard'
});