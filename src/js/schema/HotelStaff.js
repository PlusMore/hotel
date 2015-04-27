Schema.HotelStaff = new SimpleSchema({
  hotelId: {
    type: String
  },
  firstName: {
    type: String,
    label: "First Name"
  },
  lastName: {
    type: String,
    label: "Last Name"
  },
  email: {
    type: String,
    label: "E-mail address"
  },
  phone: {
    type: String,
    label: "Phone Number (Optional)",
    optional: true,
    min: 7
  },
  isManager: {
    type: Boolean,
    label: "Is this user a Manager?",
  },
  userId: {
    type: String,
    optional: true
  }
});
