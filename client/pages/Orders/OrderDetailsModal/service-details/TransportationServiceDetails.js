Template.TransportationServiceDetails.helpers({
	transportationType: function () {
    switch (this.service.options.transportationType) {
      case 'taxi': 
        return 'Taxi';
        break;
      case 'limo': 
        return 'Limo';
        break;
    }
  }
});