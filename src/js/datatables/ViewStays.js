TabularTables.ViewStays = new Tabular.Table({
  name: "Stays",
  collection: Stays,
  pub: "tabular_Stays",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  dom: 'fr<"table-responsive"t>ipl',
  extraFields: ['checkInDate', 'checkoutDate', 'zone', 'guestId', 'users', 'preReg', 'active'],
  language: {
    emptyTable: "There are no stays to display."
  },
  columns: [{
    title: "Room",
    data: "roomName",
    tmpl: Meteor.isClient && Template.StayRoomCell
  }, {
    title: "Check-In",
    tmpl: Meteor.isClient && Template.StayCheckInCell
  }, {
    title: "Check-Out",
    tmpl: Meteor.isClient && Template.StayCheckOutCell
  }, {
    tmpl: Meteor.isClient && Template.ViewStayCell
  }]
});
