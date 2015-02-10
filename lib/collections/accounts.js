Schema.addHotelStaff = new SimpleSchema({
  hotelId: {
    type: String
  },
  email: {
    type: String,
    label: "E-mail address"
  },
  isManager: {
    type: Boolean,
    label: "Is this user a Manager?"
  }
});