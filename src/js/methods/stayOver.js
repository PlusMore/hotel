Meteor.methods({
  stayOver: function(stayId) {
    var stay = Stays.findOne(stayId);

    // if stay is over, end it.
    if (moment().zone(stay.zone) > moment(stay.checkoutDate).zone(stay.zone)) {
      Stays.update(stayId, {
        $set: {
          active: false
        }
      });
      Devices.update(stay.deviceId, {
        $unset: {
          stayId: 1
        }
      });
      if (stay.users && stay.users.length > 0) {
        Meteor.users.update({
          _id: {
            $in: stay.users
          }
        }, {
          $unset: {
            stayId: 1
          }
        });
      }
    }
  }
});