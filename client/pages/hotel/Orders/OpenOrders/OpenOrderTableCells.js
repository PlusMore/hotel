Template.requestedTimeAgoCell.helpers({
  requestedDateTimeAgo: function() {
    var now = Session.get('currentTime') || new Date();
    return moment(this.requestedDate).fromNow();
  }
});