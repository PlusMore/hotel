TabularTables.ViewDevices = new Tabular.Table({
  name: "ViewDevices",
  collection: Devices,
  pub: "tabular_Devices",
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  dom: 'fr<"table-responsive"t>ipl',
  extraFields: [
    'roomId'
  ],
  columns: [{
    data: "location",
    title: "Location",
    tmpl: Meteor.isClient && Template.viewDevicesLocationCell
  }, {
    title: "Check-in",
    tmpl: Meteor.isClient && Template.viewDevicesCheckinCell
  }, {
    title: "Check-out",
    tmpl: Meteor.isClient && Template.viewDevicesCheckoutCell
  }, {
    tmpl: Meteor.isClient && Template.viewDevicesActionCell
  }],
  createdRow: function(row, data, dataIndex) {
    var stay = Stays.findOne(data.stayId);
    if (stay) {
      var now = Session.get('currentTime') || new Date();
      var checkin = moment(stay.checkInDate);
      var checkout = moment(stay.checkoutDate);
      if (checkin <= now && now <= checkout) {
        $(row).addClass('success');
      }
    }
  }
});
