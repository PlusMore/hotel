Schema.Team = new SimpleSchema({
  name: {
    type: String,
    label: 'Team Name'
  },
  description: {
    type: String,
    optional: true,
    label: "Description (optional)"
  },
  hotelId: {
    type: String
  },
  memberIds: {
    type: [String],
    optional: true
  }
});
