Schema.AccountInformation = new SimpleSchema({
  userId: {
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
    regEx: SimpleSchema.RegEx.Email,
    label: "Email"
  }
});
