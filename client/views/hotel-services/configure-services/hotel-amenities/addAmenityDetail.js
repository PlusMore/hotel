Template.addAmenityDetail.helpers({
	hotelId: function () {
		return Session.get('hotelId');
	},
	amenityId: function () {
		return this._id;
	}
});

