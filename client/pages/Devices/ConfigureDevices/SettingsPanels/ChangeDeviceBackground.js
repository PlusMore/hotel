Template.ChangeDeviceBackground.events({
  'click .btn-change-photo': function(e, tmpl) {
    e.preventDefault();

    var hotelId = Meteor.user().hotelId || Session.get('hotelId');

    filepicker.pick(function(InkBlob) {
      Meteor.call('changeHotelPhoto', InkBlob, hotelId, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Device background updated!');
        }
      });
    });
  }
});
