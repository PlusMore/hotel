Template.AddServices.helpers({
  serviceTypeClass: function(serviceType) {
    return HotelServices.find({
      hotelId: Session.get('hotelId'),
      type: serviceType
    }).count() > 0 ? 'panel-solid-primary' : 'panel-solid-default';
  },
  serviceTypeActive: function(serviceType) {
    return HotelServices.find({
      hotelId: Session.get('hotelId'),
      type: serviceType
    }).count() > 0 ? true : false;
  }
});

Template.AddServices.events({
  'click #add-service': function(e, tmpl) {
    var serviceType = $(e.target).attr("service-type");
    var hotelId = Session.get('hotelId');
    Meteor.call('activateHotelService', serviceType, hotelId, function(err, res) {
      if (err) {
        Messages.error(err);
      }
    });
  },
  'click #remove-service': function(e, tmpl) {
    e.preventDefault();
    var serviceType = $(e.target).attr("service-type");
    var hotelId = Session.get('hotelId');
    if (confirm('Are you sure? This will remove all saved configuration settings.')) {
      Meteor.call('removeHotelService', serviceType, hotelId, function(err, res) {
        if (err) {
          Messages.error(err);
        }
      });
    }
  }
});
