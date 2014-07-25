Template.patronOrder.helpers({
  attention: function() {
    var now = Session.get('currentTime') || new Date();
    console.log(now);
    var requestedAt = moment(this.requestedAt);
    if (requestedAt.isBefore(moment(now).subtract(20, 'minutes'))) {
      return 'danger'
    }
    if (requestedAt.isBefore(moment(now).subtract(10, 'minutes'))) {
      return 'warning';
    }
  }
});

Template.patronOrder.events({
  'click .btn.confirm-reservation': function(event) {
    event.preventDefault();
    Meteor.call('confirmPatronReservation', this._id);
  },
  'click .btn.cancel-reservation': function(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to cancel this reservation?")) {
      Meteor.call('cancelPatronReservation', this._id);
    }
  }
});