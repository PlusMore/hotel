Template.HotelBackgroundSettings.events({
  'click .btn-change-photo': function(e, experienceTemplate) {
    e.preventDefault();

    var hotelId = Meteor.user().hotelId || Session.get('hotelId');

    filepicker.pick(function(InkBlob) {
      Meteor.call('changeHotelPhoto', InkBlob, hotelId);
    });
  }
});