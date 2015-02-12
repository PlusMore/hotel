Session.setDefault('pushNotifications', true);
Session.setDefault('shareStatus', false);

Template.LeftSidebarSettings.helpers({
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.userId(), 'admin');
  },
  hotels: function() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      Meteor.subscribe('hotelsAdminSelect');
      return Hotels.find();
    }
  },
  currentHotelOrNone: function() {
    if (Session.get('hotelName')){
      return "Selected: " + Session.get('hotelName');
    }
    return "Selected: None";
  },
  pushNotifications: function () {
    return Session.get('pushNotifications') ? 'checked' : '';
  },
  shareStatus: function() {
    return Session.get('shareStatus') ? 'checked' : '';
  }
});

Template.LeftSidebarSettings.events({
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
  },
  'change #select-hotel': function (e, tmpl) {
    e.preventDefault();
    if (tmpl.$(e.currentTarget).val() != "none") {
      Session.set('hotelId', tmpl.$(e.currentTarget).val());
      Session.set('hotelName', tmpl.$(e.currentTarget).find('option:selected').text());
    } else {
      Session.set('hotelId', undefined);
      Session.set('hotelName', undefined);
    }
  }
});