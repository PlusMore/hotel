MenuItems = new Meteor.Collection('roomServiceMenuItems');

MenuItems.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove:  function(userId, doc){
    return false;
  }
});

Schema.menuItem = new SimpleSchema({
  name: {
    type: String,
    label: "Category Name",
    max: 200
  },
  price: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    label: 'Description'
  }
});

MenuItems.attachSchema(Schema.menuItem);