Template.OrderHistory.helpers({
  selector: function() {
    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    if (Roles.userIsInRole(user._id, ['admin','hotel-manager'])) {
      return {
        hotelId: hotelId,
        open: false,
        handledBy: 'hotel'
      }
    } else {
      var userGroupsCursor = user.memberOfGroups();
      var userGroups = userGroupsCursor.fetch();
      var userGroupsServices = [];
      _.each(userGroups, function(group) {
        _.each(group.servicesHandled, function(serviceType) {
          userGroupsServices.push(serviceType);
        })
      })
      return {
        hotelId: hotelId,
        open: false,
        handledBy: 'hotel',
        service: {
          $exists: true
        },
        "service.type": {
          $in: userGroupsServices
        }
      }
    }
  }
});

Template.OrderHistory.onCreated(function() {
  // this prevents weirdness due to tabular's nonreactive selector
  forceReRender();
});
