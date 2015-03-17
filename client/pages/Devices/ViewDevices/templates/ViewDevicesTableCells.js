Template.viewDevicesActionCell.helpers({
  isHotelManager: function() {
    return Roles.userIsInRole(Meteor.userId(), ['content-manager', 'admin']);
  }
});

Template.viewDevicesActionCell.events({
  'click .del-device': function(e) {
    e.preventDefault();
    if (confirm("Are you sure you'd like to delete this device?")) {
      Meteor.call('removeDevice', this._id);
      return true;
    }
    return false;
  }
});
