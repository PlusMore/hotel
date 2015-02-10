Session.setDefault('pushNotifications', true);
Session.setDefault('shareStatus', false);

Template.AccountSettings.helpers({
  pushNotifications: function () {
    return Session.get('pushNotifications') ? 'checked' : '';
  },
  shareStatus: function() {
    return Session.get('shareStatus') ? 'checked' : '';
  }
});

Template.AccountSettings.events({
  'change #push-notifications-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Session.set('pushNotifications', true);
    } else {
      console.log('off');
      Session.set('pushNotifications', false);
    }
  },
  'change #share-status-switch': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).prop('checked')) {
      console.log('on');
      Session.set('shareStatus', true);
    } else {
      console.log('off');
      Session.set('shareStatus', false);
    }
  }
});