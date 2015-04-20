Schema.HotelTimes = new SimpleSchema({
  _id: {
    type: String
  },
  arrivalTime: {
    type: String,
    label: 'Arrival Time'
  },
  departureTime: {
    type: String,
    label: 'Departure Time'
  },
  arrivalMinutes: {
    type: Number
  },
  departureMinutes: {
    type: Number
  },
});
