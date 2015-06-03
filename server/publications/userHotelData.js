Meteor.publish('userHotelData', function(hotelId) {
  var userId = this.userId;

  if (userId) {
    var fields = {
        hotelId: 1,
        emails: 1,
        profile: 1,
      },
      user = Meteor.users.findOne({
        _id: userId
      }),
      hotelId = user && user.hotelId || hotelId;
    if (hotelId) {
      return [
        Meteor.users.find({
          _id: userId
        }, {
          fields: fields
        }),
        Hotels.find({
          _id: hotelId
        }),
        Groups.find({
          hotelId: hotelId
        })
      ];
    } else {
      this.ready();
      return null;
    }
  } else {
    this.ready();
    return null;
  }
});

Meteor.startup(function () {
  Meteor.users._ensureIndex({hotelId: 1}, {background: true});
});
