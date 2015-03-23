Template.LeftSidebarSettings.helpers({
  isAdmin: function() {
    return Roles.userIsInRole(Meteor.user(), 'admin');
  },
  hotels: function() {
    if (Roles.userIsInRole(Meteor.user(), 'admin')) {
      Meteor.subscribe('hotelsAdminSelect');
      return Hotels.find();
    }
  },
  currentHotelOrNone: function() {
    if (Session.get('hotelName')) {
      return "Selected: " + Session.get('hotelName');
    }
    return "Selected: None";
  },
  user: function() {
    return Meteor.user();
  }
});

Template.LeftSidebarSettings.events({
  'change #select-hotel': function(e, tmpl) {
    e.preventDefault();
    if (tmpl.$(e.currentTarget).val() != "none") {
      Session.set('hotelId', tmpl.$(e.currentTarget).val());
      var hotelName = tmpl.$(e.currentTarget).find('option:selected').text();
      Session.set('hotelName', hotelName);
      Messages.success("View switched to '" + hotelName + "'");
    } else {
      Session.set('hotelId', undefined);
      Session.set('hotelName', undefined);
    }
  }
});
