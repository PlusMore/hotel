Template.OpenOrders.helpers({
  selector: function() {

    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    var filterGroupId = Session.get('ordersDatatableFilterGroupId');

    var selector = {
      hotelId: hotelId,
      open: true,
      handledBy: 'hotel'
    };

    // if user is admin/manager, no restrictions
    if (Roles.userIsInRole(user._id, ['admin', 'hotel-manager'])) {
      // if filter applied
      if (filterGroupId) {
        var group = Groups.findOne(filterGroupId);

        selector["service.type"] = {
          $in: group.servicesHandled
        };
      }

    // if staff, restricted to groups the staff member is in
    } else {
      // if filter applied
      if (filterGroupId) {
        var group = Groups.findOne(filterGroupId);
        selector["service.type"] = {
          $in: group.servicesHandled
        };

      // no filter applied, show all orders for groups staff is in
      } else {
        var userGroupsCursor = user.memberOfGroups(); // collection helper
        var userGroups = userGroupsCursor.fetch();
        var userGroupsServices = [];
        _.each(userGroups, function(group) {
          _.each(group.servicesHandled, function(serviceType) {
            userGroupsServices.push(serviceType);
          })
        })

        selector["service.type"] = {
          $in: userGroupsServices
        };
      }
    }

    return selector;
  }
});

Template.OpenOrders.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotelId = Session.get('hotelId');
    self.subscribe('groups', hotelId);
    // this prevents weirdness due to tabular's nonreactive selector
    forceReRender();
  });
});
