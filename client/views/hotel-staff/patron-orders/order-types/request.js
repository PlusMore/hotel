Template.request.helpers({
  isPending: function() {
    var status = this.status || 'pending'
    return (status === 'pending');
  },
  isConfirmed: function() {
    return (this.status === 'confirmed' || !!this.confirmationDate);
  },
  isCancelled: function() {
    return (this.status === 'cancelled');
  },
  cancelledDateMomentAgo: function() {
    var now = Session.get('currentTime');
    return moment(this.cancelledDate).fromNow();
  },
  requestedDateTimeAgo: function() {
    var now = Session.get('currentTime');
    return moment(this.requestedAt).fromNow();
  },
  orderStatus: function() {
    if (this.status === 'confirmed') {
      return 'Confirmed';
    } 

    if (this.status === 'cancelled') {
      return 'Cancelled';
    }

    return '(In Progress)';
  },
  friendlyRequestType: function() {
    switch (this.request.type) {
      case 'transportation':
        return 'Transportation';
        break;
      case 'bellService': 
        return 'Bell Service';
        break;
      case 'houseKeeping': 
        return 'House Keeping';
        break;
      case 'wakeUpCall': 
        return 'Wake Up Call';
        break;
      case 'valetServices': 
        return 'Valet Services'
        break;
      default: 
        throw new Meteor.Error(500, 'Request type is not configured', request);
        break;
    }
  }
});

Template.request.events({
  'click .btn.btn-cancel-request': function(event) {
    event.preventDefault(); 
    if (confirm("Are you sure you want to cancel this request?")) {
      Meteor.call('cancelPatronRequest', this._id);
    } 
  }
});