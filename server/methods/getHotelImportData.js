Meteor.methods({
  getHotelImportData: function(fromAddress) {
    check(fromAddress, String);

    var hotel = Hotels.findOne({importsEmail: fromAddress});

    if (!hotel) {
      throw new Meteor.Error(500, "No hotel has importsEmail: " + fromAddress);
    }

    var importData = {
      hotelId: hotel._id,
    };

    return importData;
  }
});
