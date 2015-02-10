// code is used on client and server

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.People = new Tabular.Table({
  name: "People",
  collection: People,
  columns: [
    {data: "name", title: "First Name"},
    {data: "surname", title: "Last Name"},
    {data: "fullname", title: "Full Name"},
    {data: "username", title: "Username"},
    {
      data: "date",
      title: "Checkout Date",
      render: function (val, type, doc) {
        if (val instanceof Date) {
          return moment(val).calendar();
        } else {
          return "Never";
        }
      }
    }
  ]
});