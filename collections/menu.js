MenuCategories = new Meteor.Collection('roomServiceMenuCategories')

Schema.MenuCategory = new SimpleSchema({
  name: {
    type: String,
    label: "Category Name",
    max: 200
  },
  hotelId: {
    type: String
  }
});

MenuCategories.attachSchema(Schema.MenuCategory);

MenuItems = new Meteor.Collection('roomServiceMenuItems');

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