Template.StayDetailsModal.helpers({
  stay: function() {
    return Stays.findOne(Session.get('viewStayId'));
  },
  stayType: function() {
    if (this.isActive()) {
      return "ActiveStayDetails";
    } else if (this.isPrereg()) {
      return "PreregStayDetails";
    } else {
      return "PastStayDetails";
    }
  }
});
