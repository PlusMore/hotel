Template.Loader.helpers({
  loaderClass: function() {
    return Session.get('loader') ? 'animated fadeIn' : 'animated fadeOut not-visible';
  },
  loaderText: function() {
    return Session.get('loader');
  }
});
