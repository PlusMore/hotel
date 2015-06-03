Template.ManageGroups.helpers({
  groups: function() {
    return Groups.find();
  }
});

Template.ManageGroups.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var hotelId = Session.get('hotelId');
    self.subscribe('groups', hotelId);
    self.subscribe('hotelUsers', hotelId);
  });
});

Template.ManageGroups.events({
  'click #create-new-group': function(e) {
    e.preventDefault();
    BootstrapModalPrompt.prompt({
      dialogTemplate: Template.CreateGroupModal
    });
  }
});
