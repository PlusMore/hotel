Schema.Room = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  hotelId: {
    type: String
  },
  stayId: {
    type: String,
    optional: true
  }
});

Rooms.attachSchema(Schema.Room);
