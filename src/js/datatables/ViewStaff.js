TabularTables.ViewStaff = new Tabular.Table({
  name: "ViewStaff",
  collection: Meteor.users,
  autoWidth: true,
  searching: false,
  pagingType: "simple",
  dom: 'fr<"table-responsive"t>ipl',
  extraFields: [
    'roles',
    'emails'
  ],
  allow: function(userId) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  columns: [{
    tmpl: Meteor.isClient && Template.staffEditCell
  }, {
    tmpl: Meteor.isClient && Template.staffAvatarCell
  }, {
    data: "profile.firstName",
    title: "First",
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        } else {
          return '';
        }
      }
    },
    tmpl: Meteor.isClient && Template.staffFirstNameCell
  }, {
    data: "profile.lastName",
    title: "Last",
    render: function(val, type, doc) {
      if (type != 'display') {
        if (val) {
          return val;
        } else {
          return '';
        }
      }
    },
    tmpl: Meteor.isClient && Template.staffLastNameCell
  }, {
    title: "Contact",
    tmpl: Meteor.isClient && Template.staffContactCell
  }, {
    title: "Role",
    tmpl: Meteor.isClient && Template.staffRoleCell
  }]
});
