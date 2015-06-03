Template.AdminHotelSelect.helpers({
  hotels: function() {
    return Hotels.find({}, {
      sort: {
        name: 1
      }
    });
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

Template.AdminHotelSelect.onCreated(function() {
  this.subscribe('hotelsAdminSelect');
});

Template.AdminHotelSelect.events({
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
