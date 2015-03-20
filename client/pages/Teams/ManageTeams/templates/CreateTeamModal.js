Template.CreateTeamModal.helpers({
  createNewTeamSchema: function() {
      return Schema.Team;
  },
  hotelId: function() {
    return Session.get('hotelId');
  }
});
