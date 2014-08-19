/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Hotels = new Meteor.Collection('hotels');
// Allow/Deny

Hotels.allow({
  insert: function(userId, doc){
    return false;
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove:  function(userId, doc){
    return false;
  }
});

Meteor.methods({
  changeHotelPhoto: function(InkBlob) {
    check(InkBlob, Object);
    var user = Meteor.user();
    
    if (user && Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      var hotelId = Meteor.user().hotelId;
      if (hotelId) {
        var hotel = Hotels.findOne();
        if (!hotel) {
          Errors.throw('No hotel found for user');
        }

        Hotels.upsert(hotelId, {$set: {
          photoUrl: InkBlob.url,
          photoName: InkBlob.filename,
          photoSize: InkBlob.size
        }}, {validate: false});  
      }
    } else {
      Errors.throw('You do not have proper access to this functionality.');
    }
  }
});