Schema.PreregisteredStay = new SimpleSchema({
  hotelId: {
    type: String
  },
  "preReg.guestLastName": {
    type: String,
    label: "Guest's Last Name"
  },
  "preReg.guestEmail": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email Address (optional)",
    optional: true
  },
  "preReg.guestPhone": {
    type: String,
    label: "Phone Number (optional)",
    optional: true
  },
  "preReg.startDate": {
    type: Date,
    label: "Check-In Date"
  },
  "preReg.endDate": {
    type: Date,
    label: "Check-Out Date"
  }
});
