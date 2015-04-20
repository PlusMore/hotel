Schema.MenuItem = new SimpleSchema({
  name: {
    type: String,
    label: "Item Name",
    max: 200
  },
  price: {
    type: Number,
    min: 0,
    decimal: true,
    label: "Price ($)"
  },
  description: {
    type: String,
    label: 'Description (optional)',
    optional: true
  },
  menuCategoryId: {
    type: String
  },
  active: {
    type: Boolean,
    defaultValue: true
  }
});

MenuItems.attachSchema(Schema.MenuItem);
