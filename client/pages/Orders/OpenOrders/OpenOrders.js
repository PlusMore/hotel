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
        var userGroupsCursor = user.memberOfGroups();
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
  },
  filterGroupSelect: function() {
    var filterGroupId = Session.get('ordersDatatableFilterGroupId');
    if (filterGroupId) {
      return Groups.findOne(filterGroupId).name;
    } else {
      return "All";
    }
  },
  allGroups: function() {
    return Groups.find({
      hotelId: Session.get('hotelId')
    }, {
      $sort: {
        name: 1
      }
    });
  }
});

Template.OpenOrders.events({
  'change #order-group-filter': function(e, tmpl) {
    e.preventDefault();
    if (tmpl.$(e.currentTarget).val() != "all" && tmpl.$(e.currentTarget).val() != "none") {
      Session.set('ordersDatatableFilterGroupId', tmpl.$(e.currentTarget).val());
      var groupName = tmpl.$(e.currentTarget).find('option:selected').text();
      Messages.success("Filter Applied: " + groupName);
    } else if (tmpl.$(e.currentTarget).val() == "all") {
      Session.set('ordersDatatableFilterGroupId', undefined);
      Messages.success("Filter Applied: All");
    }
    forceReRender();
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
  self.autorun(function() {
    var groupFilterId = Session.get('ordersDatatableFilterGroupId');
    forceReRender();
  });
});
