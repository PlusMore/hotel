Meteor.publish('usersForStayId', function(stayId) {
  var stay = Stays.findOne(stayId);

  if (stay && stay.users) {
    return Meteor.users.find({
      _id: {
        $in: stay.users
      }
    }, {
      fields: {
        emails: 1,
        profile: 1
      }
    });
  } else {
    return null;
  }
});
