Meteor.methods({
  changeCheckoutDate: function(doc) {
    check(doc, Schema.ChangeCheckoutDate);
    var stay = Stays.findOne(doc._id);

    if (!stay) {
      throw new Meteor.Error(500, 'Not a valid stay');
    }

    var newCheckoutDate = moment(doc.checkoutDate).zone(stay.zone).toDate();
    newCheckoutDate.setMinutes(doc.checkoutMinutes);

    Stays.update({
      _id: doc._id
    }, {
      $set: {
        checkoutDate: newCheckoutDate
      }
    });
  }
});
