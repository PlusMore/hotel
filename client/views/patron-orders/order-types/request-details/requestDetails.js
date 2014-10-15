Template.requestDetails.helpers({
  when: function() {
    var request = this.request;
    var options = this.request.options || {};

    // deprecated - backwards compatible - remove options.date condition when no longer around
    if (options && options.date) {
      return moment(this.request.options.date).calendar();
    } else if (this.request && this.request.date) {
      var when = moment(request.date).zone(request.zone);
      when = when.format('MMMM Do YYYY, h:mm a') + " (" + when.calendar() + ")";
      return when;
    } else {
      return 'ASAP';
    }
  },
  requestTemplate: function() {
    switch (this.request.type) {
      case 'transportation': 
        return 'transportationRequestDetails';
      case 'roomService': 
        return 'roomServiceRequestDetails';
      case 'valetServices': 
        return 'valetServicesRequestDetails';
      default:
        return '';
    }
  }
});