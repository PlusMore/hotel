Template.HotelAmenity.helpers({
  amenityDetails: function() {
    return AmenityDetails.find({
      amenityId: this._id
    });
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.HotelAmenity.events({
  'click #remove-amenity': function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this amenity? All descriptions and details will be lost.')) {
      Meteor.call('removeAmenity', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('Amenity Removed');
          return true;
        }
      });
    }
    return false;
  },
  'click #remove-detail': function(e) {
    e.preventDefault();
    Meteor.call('removeAmenityDetail', this._id, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.error('Amenity Detail Removed');
      }
    });

  },
  'click #edit-amenity': function(e) {
    e.preventDefault();
    Session.set('editAmenityId', this._id);
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.EditHotelAmenityModal
    });
  }
});
