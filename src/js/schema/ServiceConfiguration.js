Schema.ServiceConfiguration = new SimpleSchema({
  _id: {
    type: String
  },
  startTime: {
    type: String,
    label: 'Start Time',
    optional: true
  },
  endTime: {
    type: String,
    label: 'End Time',
    optional: true
  },
  startMinutes: {
    type: Number,
    optional: true
  },
  endMinutes: {
    type: Number,
    optional: true
  },
  allowTips: {
    type: Boolean,
    label: "Allow Tipping?"
  }
});
