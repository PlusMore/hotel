Template.ReassignButton.helpers({
  reassignButtonClass: function() {
    if (this.isUnassigned()) {
      return "btn-default disabled";
    } else {
      return "btn-info";
    }
  }
});

Template.ReassignButton.events({
  'click .reassign-user': function(e, tmpl) {
    e.preventDefault();
    var userId = $(e.target).attr("staff-id");
    var orderId = tmpl.data._id;
    Meteor.call('reassignOrder', orderId, userId, function(err, res) {
      if (err) {
        Messages.error(err);
      } else {
        Messages.success('You have reassigned this order!');
      }
    });
    forceReRender();
    Dropdowns.hide('reassignUserDropdown');
  }
});
