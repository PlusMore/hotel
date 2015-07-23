Schema.GuestCheckIn = new SimpleSchema({
  hotelId: {
    type: String
  },
  roomId: {
    type: String
  },
  guestFirstName: {
    type: String,
    label: "First Name"
  },
  guestLastName: {
    type: String,
    label: "Last Name"
  },
  guestEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email Address"
  },
  guestPhone: {
    type: String,
    label: "Phone Number (optional)",
    optional: true
  },
  checkoutDate: {
    type: Date,
    label: "Check-Out Date"
  },
  zone: {
    type: Number
  },
  currentStayId: {
    type: String,
    optional: true
  },
  preregId: {
    type: String,
    optional: true
  }
});
