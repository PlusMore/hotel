Session.setDefault('theme', 'theme-default');

Template.AppLayout.helpers({
  theme: function () {
    return Session.get('theme');
  },
  ios: function() {
    return Session.get('iOS-standalone') ? 'ios' : '';
  }
});

