Template.PastStayDetails.helpers({
  users: function() {
    return Template.instance().users();
  },
});

Template.PastStayDetails.created = function() {
  var instance = this;

  instance.autorun(function() {
    var sub = Meteor.subscribe('usersForStayId', Session.get('viewStayId'));
  });

  instance.users = function() {
    var stay = Stays.findOne(Session.get('viewStayId'));
    if (stay && stay.users) {
      return Meteor.users.find({
        _id: {
          $in: stay.users
        }
      });
    }
  }
};
