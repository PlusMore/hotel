Schema.ChangeCheckoutDate = new SimpleSchema({
  _id: {
    type: String
  },
  checkoutTime: {
    type: String,
    label: "Checkout Time"
  },
  checkoutMinutes: {
    type: Number
  },
  checkoutDate: {
    type: Date,
    label: "Checkout Date"
  }
});
