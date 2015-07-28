PlusMore.Services.Imports = Cluster.discoverConnection('imports');

PlusMore.Services.Imports.subscribe('arrivalImports');

ArrivalImports = new Meteor.Collection('arrivalImports', {
  connection: PlusMore.Services.Imports
});

ProcessedObservations = new Meteor.Collection('processedObservations');

var observationHasBeenProcessed = function(observation) {
  var processedObservation = ProcessedObservations.findOne(observation);
  return !! processedObservation;
};

Meteor.startup(function() {
  ArrivalImports.find().observe({
    added: function(doc) {
      var observation = {
        collectionName: ArrivalImports._name,
        hook: 'added',
        docId: doc._id
      };

      if (! observationHasBeenProcessed(observation)) {
        ProcessedObservations.insert(observation);

        console.log("new observation", ArrivalImports._name, 'added', doc._id);

        var hotel = Hotels.findOne({importsEmail: doc.from});
        console.log('Received import from ', hotel.name);

        switch (doc.format) {
          case 'oracleXML':
            console.log('detected format OracleXML, preregister arrivals');
            Meteor.call('registerStaysFromOracleXMLArrivalsImport', hotel, doc.reservations, function(err, res) {
              if (err) {
                console.log('error preregistering arrivals');
                console.log(err);
              } else {
                console.log('Stays Registered')
              }
            });
            break;
          default:
            console.log('ERROR! Format ' + doc.format + ' is not supported');
            console.log('DOC ID: ' + doc._id);
        }

      };
    }
  });

});
