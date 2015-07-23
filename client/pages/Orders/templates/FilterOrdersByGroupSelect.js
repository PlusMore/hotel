Template.FilterOrdersByGroupSelect.helpers({
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

Template.FilterOrdersByGroupSelect.events({
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
  }
});

Template.FilterOrdersByGroupSelect.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var groupFilterId = Session.get('ordersDatatableFilterGroupId');
    // this prevents weirdness due to tabular's nonreactive selector
    TabularTables.refresh();
  });
});
