MenuCategories = new Meteor.Collection('roomServiceMenuCategories');

Schema.MenuCategory = new SimpleSchema({
  name: {
    type: String,
    label: "Category Name",
    max: 200
  },
  active: {
    type: Boolean
  },
  description: {
    type: String,
    label: "Description (Optional)",
    optional: true
  },
  hotelId: {
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
  }
});

MenuCategories.allow({
  insert: function(userId, doc) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return Roles.userIsInRole(userId, ['hotel-manager', 'admin']);
  },
  remove: function(userId, doc) {
    return false;
  }
});

MenuCategories.attachSchema(Schema.MenuCategory);

Schema.menuCategoryAvailability = new SimpleSchema({
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
  }
});

Schema.menuCategoryDescriptionSchema = new SimpleSchema({
  _id: {
    type: String
  },
  description: {
    type: String,
    label: "Description (Optional)",
    optional: true
  }
});