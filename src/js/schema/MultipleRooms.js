Schema.MultipleRooms = new SimpleSchema({
  startNum: {
    type: Number,
    label: "Starting Room Number",
    min: 0
  },
  endNum: {
    type: Number,
    label: "Ending Room Number",
    min: 1
  },
  hotelId: {
    type: String
  }
});
