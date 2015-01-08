Template.configureHotelAmenities.helpers({
	isChecked: function () {
		// sets property 'checked' of input checkbox to 'checked' or ''
    	// if not configured, return ''
    	if (!this.configuration) {
    	    return '';
    	} else {
    	    return this.configuration.active ? 'checked' : '';
    	}
	}
});