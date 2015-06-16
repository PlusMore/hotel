ArrivalImports = new Meteor.Collection('arrivalImports', {connection: Cluster.discoverConnection('imports')});

ArrivalImports.find({
  registered: false
}).observe({
  added: function(doc) {
    var hotel = Hotels.findOne({
      importsEmail: doc.from
    });
    if (!hotel) {
      console.log('ERROR! No import address match: ' + doc.from);
      console.log('DOC ID: ' + doc._id);
    } else {
      switch (doc.format) {
        case 'oracleXML':
          Meteor.call('preregisterOracleXMLArrival', hotel._id, doc._id, function(err, res) {
            if (err) {
              console.log(err);
            } else {
              ArrivalImports.update(doc._id, {
                registered: true
              });
            }
          });
          break;
        default:
          console.log('ERROR! Format ' + doc.format + ' is not supported');
          console.log('DOC ID: ' + doc._id);
      }
    }
  }
});

Meteor.methods({
  'preregisterOracleXMLArrival': function(hotelId, importArrivalId) {
    check(hotelId, String);
    check(importArrivalId, String);

    // parse and register import arrival here
  }
});
