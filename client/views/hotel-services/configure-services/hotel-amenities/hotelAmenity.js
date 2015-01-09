Template.hotelAmenity.helpers({
	amenityDetails: function () {
		return AmenityDetails.find({amenityId: this._id});
	}
});

Template.hotelAmenity.events({
	'click #remove-amenity': function () {
		Meteor.call('removeAmenity', this._id, function (err, result){});
	},
	'click #remove-detail': function () {
		Meteor.call('removeAmenityDetail', this._id, function (err, result){});
	}
});