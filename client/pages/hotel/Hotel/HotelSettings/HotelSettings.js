Template.HotelSettings.helpers({
	hotel: function () {
	    var hotelId = Session.get('hotelId');
	    if (hotelId) {
	      	var hotel = Hotels.findOne(hotelId);
	      	if (hotel) {
	        	return hotel;
	      	}
	    } 
	},
	editHotelSchema: function () {
		return Schema.hotelInfo;
	}
});

Schema.hotelInfo = new SimpleSchema({
	hotelId: {
		type: String,
		optional: false
	},
	name: {
		type: String,
		label: "Hotel Name",
		max: 50,
		optional: false
	},
	phone: {
		type: String,
		label: "Phone Number",
		max: 20,
		optional: false
	},
	description: {
		type: String,
		label: "About Us",
		max: 2000,
		optional: true
	}
});