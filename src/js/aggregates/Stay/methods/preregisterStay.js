Meteor.methods({
  preregisterStay: function(doc) {
    check(doc, Schema.PreregisteredStay);
    doc.zone = moment(doc.preReg.endDate).zone();
    var hotel = Hotels.findOne(doc.hotelId);
    doc.preReg.startDate.setMinutes(hotel.arrivalMinutes());
    doc.preReg.endDate.setMinutes(hotel.departureMinutes());
    doc.active = false;
    Stays.insert(doc);
  }
});
