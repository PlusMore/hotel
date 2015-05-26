TabularTables.ViewRooms = new Tabular.Table({
  name: "ViewRooms",
  collection: Rooms,
  pub: "tabular_Rooms",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  dom: 'fr<"table-responsive"t>ipl',
  columns: [{
    data: "name",
    title: "Room"
  }, {
    title: "Stay",
    data: "stayId",
    tmpl: Meteor.isClient && Template.RoomActiveStayCell
  }, {
    tmpl: Meteor.isClient && Template.RoomActionsCell
  }]
});
