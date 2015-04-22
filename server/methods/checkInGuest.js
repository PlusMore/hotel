Meteor.methods({
  checkInGuest: function(doc) {
    check(doc, Schema.GuestCheckIn);

    // if a stay is being overwritten, change that stay's checkout date to now
    // change active boolean to false (even though it's not used yet)
    if (!!doc.currentStayId) {
      var now = new Date();
      Stays.update(doc.currentStayId, {
        $set: {
          checkoutDate: now,
          active: false
        }
      });
      console.log('overwrite stay');
    }

    // is guest a previous user
    var user = Meteor.users.findOne({
      'emails.address': doc.guestEmail
    });
    if (user) {
      doc.guestId = user._id;

      // if there are active stays for the user, clear them
      // could probably be a better solution
      // but I don't know what at this point.
      var activeStays = Stays.find({
        users: doc.guestId,
        active: true
      });
      activeStays.forEach(function(activeStay) {
        Stays.update(activeStay._id, {
          $set: {
            active: false
          }
        });
      });

      // send an email here
      console.log('Existing guest checked in, should send email here');
    } else {
      // create account for new guest
      var accountOptions = {
        email: doc.guestEmail,
        profile: {
          firstName: doc.guestFirstName,
          lastName: doc.guestLastName,
          phone: doc.guestPhone
        },
        roles: ['guest']
      }

      var userId = Accounts.createUser(accountOptions);

      Accounts.sendEnrollmentEmail(userId, accountOptions.email);

      doc.guestId = userId;
    }

    var room = Rooms.findOne(doc.roomId);

    if (!room) {
      throw new Meteor.Error(500, 'Not a valid room');
    }

    var users = [];
    users.push(doc.guestId);

    // if stay was preregistered
    if (doc.preregId) {
      Stays.update({
        _id: doc.preregId
      }, {
        $set: {
          guestId: doc.guestId,
          users: users,
          roomId: room._id,
          roomName: room.name, // Used frequently in UI, so denormalized
          checkInDate: new Date(),
          checkoutDate: doc.checkoutDate,
          active: true,
          zone: doc.zone
        }
      });

      var stayId = doc.preregId;

      // stay is new
    } else {
      var stay = {
        hotelId: doc.hotelId,
        guestId: doc.guestId,
        users: users,
        zone: doc.zone,
        roomId: room._id,
        roomName: room.name, // Used frequently in UI, so denormalized
        checkInDate: new Date(),
        checkoutDate: doc.checkoutDate,
        active: true
      }

      var stayId = Stays.insert(stay);
    }

    Rooms.update(room._id, {
      $set: {
        stayId: stayId
      }
    });

    Meteor.users.update(doc.guestId, {
      $set: {
        stayId: stayId
      }
    });

    return room.name;
  }
});
