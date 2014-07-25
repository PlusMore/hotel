Template.requestDetails.helpers({
  when: function() {
    return moment(this.request.options.date).calendar();
  },
  formattedDate: function() {
    return moment(this.request.options.date).format('MMMM Do, YYYY h:mm a')
  },
  requestTemplate: function() {
    switch (this.request.type) {
      case 'transportation': 
        return 'transportationRequestDetails'
      default:
        return '';
        break;
    }
  }
});