Template.StaffDetailsModal.helpers({
	staffMember: function() {
		var userId = Session.get('staffDetailsId');
		return Meteor.users.findOne(userId);
	},
  hotelStaffSchema: function() {
    return Schema.addHotelStaff;
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
      Meteor.call('changeAccountAvatar', InkBlob, userId);
    });
  }
});

AutoForm.hooks({
  editHotelStaffForm: {
    onSuccess: function(operation, result, template) {
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      console.log(error);
    }
  }
});