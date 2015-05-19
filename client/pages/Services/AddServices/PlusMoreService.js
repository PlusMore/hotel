Template.PlusMoreService.helpers({
  isServiceConfiguredForHotelClass: function() {
    return HotelServices.find({
      hotelId: Session.get('hotelId'),
      type: this.type
    }).count() > 0 ? 'panel-solid-primary' : 'panel-solid-default';
  },
  isActive: function(serviceType) {
    return HotelServices.find({
      hotelId: Session.get('hotelId'),
      type: this.type
    }).count() > 0 ? true : false;
  },
  configuredText: function() {
    return HotelServices.find({
      hotelId: Session.get('hotelId'),
      type: this.type
    }).count() > 0 ? 'Configured' : 'Not Configured';
  },
  configuredService: function() {
    return HotelServices.findOne({
      hotelId: Session.get('hotelId'),
      type: this.type
    });
  }
});

Template.PlusMoreService.events({
  'click #add-service': function(e, tmpl) {
    var serviceType = this.type;
    var hotelId = Session.get('hotelId');

    Meteor.call('activateHotelService', serviceType, hotelId, function(err, res) {
      if (err) {
        Messages.error(err);
      }
    });
  },
  'click #remove-service': function(e, tmpl) {
    e.preventDefault();
    var serviceType = this.type;
    var hotelId = Session.get('hotelId');

    if (confirm('Are you sure? This is a dangerous action and can not be undone. This will remove all saved configuration settings.\n\nIf you wish to deactivate the service, press \'Cancel\', and do so from the service\'s configuration page.\n\nPress \'OK\' to remove this service.')) {
      Meteor.call('removeHotelService', serviceType, hotelId, function(err, res) {
        if (err) {
          Messages.error(err);
        }
      });
    }
  }
});
