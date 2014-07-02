Template.customizeBackground.helpers({
  hotel: function () {
    var hotelId = Session.get('hotelId');
    if (hotelId) {
      var hotel = Hotels.findOne(hotelId);

      if (hotel) {
        return hotel;
      }
    } 
  },
  photoSrc: function() {
    return this.photoUrl || '';
  }
});
Template.customizeBackground.events({
  'click .btn-change-photo': function(e, experienceTemplate) {
    e.preventDefault();

    filepicker.pick(function(InkBlob) {
      Meteor.call('changeHotelPhoto', InkBlob);
    });
  }
});