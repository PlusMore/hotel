Template.StaffDetailsModal.helpers({
  staffMember: function() {
    var userId = Session.get('staffDetailsId');
    return Meteor.users.findOne(userId);
  },
  hotelStaffSchema: function() {
    return Schema.HotelStaff;
  },
  hotelId: function() {
    return Meteor.user().hotelId || Session.get('hotelId');
  }
});

Template.StaffDetailsModal.events({
  'click .btn-change-avatar': function(e, experienceTemplate) {
    e.preventDefault();
    var userId = Session.get('staffDetailsId');
    filepicker.pick(function(InkBlob) {
      Meteor.call('changeAccountAvatar', InkBlob, userId, function(err, res) {
        if (err) {
          Messages.error(err);
        } else {
          Messages.success('User Picture Changed!');
        }
      });
    });
  }
});

AutoForm.hooks({
  editHotelStaffForm: {
    onSuccess: function(operation, result) {
      Messages.success('Changes Saved!');
      BootstrapModalPrompt.dismiss();
    }
  }
});
