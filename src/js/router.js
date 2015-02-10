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

Router.route('/ui-elements/buttons', function () {
  this.render('Buttons', {});
},{
  name: 'UI.Buttons'
});

Router.route('/ui-elements/sliders-and-progress', function () {
  this.render('SlidersAndProgress', {});
},{
  name: 'UI.SlidersAndProgress'
});

Router.route('/ui-elements/modals-and-popups', function () {
  this.render('ModalsAndPopups', {});
},{
  name: 'UI.ModalsAndPopups'
});

Router.route('/ui-elements/tabs-and-accordions', function () {
  this.render('TabsAndAccordions', {});
},{
  name: 'UI.TabsAndAccordions'
});

Router.route('/ui-elements/alerts-and-notifications', function () {
  this.render('AlertsAndNotifications', {});
},{
  name: 'UI.AlertsAndNotifications'
});

Router.route('/ui-elements/nestable-lists', function () {
  this.render('NestableLists', {});
},{
  name: 'UI.NestableLists'
});

Router.route('/ui-elements/panels', function () {
  this.render('Panels', {});
},{
  name: 'UI.Panels'
});

Router.route('/ui-elements/icons', function () {
  this.render('Icons', {});
},{
  name: 'UI.Icons'
});

Router.route('/ui-elements/typography', function () {
  this.render('Typography', {});
},{
  name: 'UI.Typography'
});

Router.route('/forms/components', function () {
  this.render('FormComponents', {});
},{
  name: 'Forms.Components'
});

Router.route('/forms/validation', function () {
  this.render('FormValidation', {});
},{
  name: 'Forms.Validation'
});

Router.route('/forms/mask', function () {
  this.render('FormMask', {});
},{
  name: 'Forms.Mask'
});

Router.route('/forms/wizard', function () {
  this.render('FormWizard', {});
},{
  name: 'Forms.Wizard'
});

Router.route('/forms/file-upload', function () {
  this.render('FileUpload', {});
},{
  name: 'Forms.FileUpload'
});

Router.route('/upload', function () {
  var req = this.request;
  var res = this.response;

  // handle image upload here
  res.end('File upload');
}, {where: 'server'});

Router.route('/forms/wysiwyg', function () {
  this.render('FormWysiwyg', {});
},{
  name: 'Forms.WYSIWYG'
});

Router.route('/tables/basic-tables', function () {
  this.render('BasicTables', {});
},{
  name: 'Tables.BasicTables'
});

Router.route('/tables/data-tables', function () {
  this.render('DataTables', {});
},{
  name: 'Tables.DataTables'
});

Router.route('/charts/charts-c3', function () {
  this.render('ChartsC3', {});
},{
  name: 'Charts.C3'
});

Router.route('/charts/charts-chartjs', function () {
  this.render('ChartsChartJS', {});
},{
  name: 'Charts.ChartJS'
});

Router.route('/maps/google-maps', function () {
  this.render('GoogleMaps', {});
},{
  name: 'Maps.GoogleMaps'
});

Router.route('/pages/404', function () {
  this.layout('EmptyLayout');
  this.render('404', {});
},{
  name: 'Pages.404'
});

Router.route('/pages/500', function () {
  this.layout('EmptyLayout');
  this.render('500', {});
},{
  name: 'Pages.500'
});

Router.route('/pages/blank-page', function () {
  this.render('BlankPage', {});
},{
  name: 'Pages.BlankPage'
});

Router.route('/pages/locked-screen', function () {
  this.layout('EmptyLayout');
  this.render('LockedScreen', {});
},{
  name: 'Pages.LockedScreen'
});

Router.route('/pages/profile', function () {
  this.render('Profile', {});
},{
  name: 'Pages.Profile'
});

Router.route('/pages/accounts', function () {
  this.layout('EmptyLayout');
  this.render('Accounts', {});
},{
  name: 'Pages.Accounts'
});

Router.route('/css-animations', function () {
  this.render('CSSAnimations', {});
}, {
  name: 'CSSAnimations'
});