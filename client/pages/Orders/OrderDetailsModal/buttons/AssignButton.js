Template.AssignButton.events({
  'click .assign-user': function(e, tmpl) {
    e.preventDefault();
    var userId = $(e.target).attr("staff-id");
    var orderId = tmpl.data._id;
    Meteor.call('assignOrder', orderId, userId, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('You have assigned this order!');
      }
    });
    TabularTables.refresh();
    Dropdowns.hide('assignUserDropdown');
  }
});
