Template.OrderHistory.helpers({
  selector: function() {

    var user = Meteor.user();
    var hotelId = Session.get('hotelId') || user.hotelId;
    var filterGroupId = Session.get('ordersDatatableFilterGroupId');

    var selector = {
      hotelId: hotelId,
      open: false,
      handledBy: 'hotel'
    };

    // if user is admin/manager, no restrictions
    if (Roles.userIsInRole(user._id, ['admin', 'hotel-manager'])) {
      // if filter applied
      if (filterGroupId) {
        var group = Groups.findOne(filterGroupId);

        selector["service.serviceId"] = {
          $in: group.servicesHandled
        };
      }

      // if staff, restricted to groups the staff member is in
    } else {
      // if filter applied
      if (filterGroupId) {
        var group = Groups.findOne(filterGroupId);
        selector["service.serviceId"] = {
          $in: group.servicesHandled
        };

        // no filter applied, show all orders for groups staff is in
      } else {
        var userGroupsCursor = user.memberOfGroups();
        var userGroups = userGroupsCursor.fetch();
        var userGroupsServices = [];
        _.each(userGroups, function(group) {
          _.each(group.servicesHandled, function(serviceId) {
            userGroupsServices.push(serviceId);
          })
        })

        selector["service.serviceId"] = {
          $in: userGroupsServices
        };
      }
    }

    return selector;
  }
});

Template.OrderHistory.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var hotelId = Session.get('hotelId');
    self.subscribe('groups', hotelId);
    // this prevents weirdness due to tabular's nonreactive selector
    TabularTables.refresh();
  });
});
