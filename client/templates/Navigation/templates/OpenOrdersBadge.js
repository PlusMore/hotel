Template.OpenOrdersBadge.helpers({
  hasCount: function() {
    return Counts.get('open-orders') > 0;
  }
});

Template.OpenOrdersBadge.onCreated(function () {
  var self = this;

  self.autorun(function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;

    var selector = {
      hotelId: hotelId,
      open: true,
      handledBy: 'hotel'
    };

    if (Roles.userIsInRole(user, ['hotel-manager', 'admin'])) {
      // do not ammend selector if manager/admin
    } else {
      // select orders of groups user is in
      var groups = user.memberOfGroups().fetch();
      var handledServices = [];
      _.each(groups, function(group) {
        handledServices.push.apply(group.handledServices);
      });
      selector["service.type"] = {
        $in: handledServices
      };
    }

    self.subscribe('openOrdersWidget', selector);
  });
});