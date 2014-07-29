MenuCategories = new Meteor.Collection('roomServiceMenuCategories')

Schema.MenuCategory = new SimpleSchema({
  name: {
    type: String,
    label: "Category Name",
    max: 200
  },
  description: {
    type: String,
    label: "Description (Optional)",
    optional: true
  },
  hotelId: {
    type: String
  }
});

MenuCategories.allow({
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

Meteor.methods({
  configureMenuCategoryAvailability: function(menuCategoryAvailabilityConfiguration) {
    check(menuCategoryAvailabilityConfiguration, Schema.configureServiceAvailability);

    return MenuCategories.update(menuCategoryAvailabilityConfiguration._id, {
      $set: _.omit(menuCategoryAvailabilityConfiguration, '_id')
    });
  },
  editMenuCategoryDescription: function(description) {
    check(description, Schema.menuCategoryDescriptionSchema);
    return MenuCategories.update(description._id, {
      $set: _.omit(description, '_id')
    });
  }
})