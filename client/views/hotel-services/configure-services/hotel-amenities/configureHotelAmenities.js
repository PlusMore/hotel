Template.configureHotelAmenities.helpers({
	amenities: function () {
		return HotelAmenities.find({hotelId: Session.get('hotelId')});
		//return [
		//	{ 
		//		name: "Amenity 1",
		//		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint eveniet odit cum fuga voluptates cumque, porro aliquid obcaecati nesciunt, fugiat consequuntur adipisci at? Suscipit a dolorum nulla dolores, in, nisi."
		//	},
		//	{
		//		name: "Amenity 2",
		//		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam dolores molestias, alias dolor excepturi expedita. Adipisci quas quaerat iusto possimus, non excepturi, ipsa, molestiae, ex fugiat quo debitis eum corporis."
		//	}
		//]
	}
});