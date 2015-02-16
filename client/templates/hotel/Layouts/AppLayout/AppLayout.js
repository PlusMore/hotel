Session.setDefault('theme', 'theme-green');

Template.AppLayout.helpers({
  theme: function() {
    return Session.get('theme');
  },
  ios: function() {
    return Session.get('iOS-standalone') ? 'ios' : '';
  }
});
