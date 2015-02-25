Template.HotelAmenity.helpers({
	amenityDetails: function() {
		return AmenityDetails.find({amenityId: this._id});
	},
	hotelId: function() {
		return Session.get('hotelId');
	}
});

Template.HotelAmenity.events({
  'click #remove-amenity': function (e) {
  	e.preventDefault();
    if (confirm('Are you sure you want to delete?')) {
      Meteor.call('removeAmenity', this._id, function (err, res){
        if (err) {
          Messages.error(err);
        } else {
          return true;
          Messages.success('Amenity Removed');
        }
      });
    }
    return false;
  },
  'click #remove-detail': function (e) {
  	e.preventDefault();
    Meteor.call('removeAmenityDetail', this._id, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.error('Amenity Detail Removed');
        }
      });
  }
});