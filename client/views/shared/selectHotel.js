Template.selectHotel.helpers({
  hotels: function () {
    return Hotels.find();
  }
});

Template.selectHotel.events({
  'change #select-hotel': function (e, tmpl) {
    e.preventDefault();

    if (tmpl.$(e.currentTarget).val()) {
      Session.set('hotelId', tmpl.$(e.currentTarget).val());
      Session.set('hotelName', tmpl.$(e.currentTarget).find('option:selected').text());
    }
  }
});