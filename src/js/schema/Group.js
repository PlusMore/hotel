Schema.Group = new SimpleSchema({
  name: {
    type: String,
    label: 'Group Name'
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
  },
  servicesHandled: {
    type: [String],
    optional: true
  }
});
