MenuCategories = new Meteor.Collection('roomServiceMenuCategories');

Schema.MenuCategory = new SimpleSchema({
  name: {
    type: String,
    label: "Category Name",
    max: 200
  },
  active: {
    type: Boolean,
    defaultValue: false
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
  name: {
    type: String,
    label: "Category Name"
  },
  description: {
    type: String,
    label: "Description (Optional)",
    optional: true
  }
});

Meteor.methods({
  configureMenuCategoryAvailability: function(menuCategoryAvailabilityConfiguration) {
    check(menuCategoryAvailabilityConfiguration, Schema.menuCategoryAvailability);

    return MenuCategories.update(menuCategoryAvailabilityConfiguration._id, {
      $set: _.omit(menuCategoryAvailabilityConfiguration, '_id')
    }, {
      validate: false
    });
  },
  editMenuCategoryDescription: function(description) {
    check(description, Schema.menuCategoryDescriptionSchema);
    return MenuCategories.update(description._id, {
      $set: _.omit(description, '_id')
    }, {
      validate: false
    });
  },
  activateMenuCategory: function(menuCategoryId) {
    // validate 
    check(menuCategoryId, String);
    var menuCategory = MenuCategories.findOne(menuCategoryId);

    if (menuCategory) {

      // upsert (insert or update if exists) active menuCategory service
      return MenuCategories.update(
        menuCategoryId, {
          $set: {
            active: true
          }
        }, {
          validate: false
        }
      );
    } else {
      throw new Meteor.Error(500, 'Not a valid Menu Category.');
    }
  },
  deactivateMenuCategory: function(menuCategoryId) {
    // validate 
    check(menuCategoryId, String);
    var menuCategory = MenuCategories.findOne(menuCategoryId);

    if (menuCategory) {

      // upsert (insert or update if exists) active menuCategory service
      return MenuCategories.update(
        menuCategoryId, {
          $set: {
            active: false
          }
        }, {
          validate: false
        }
      );
    } else {
      throw new Meteor.Error(500, 'Not a valid Menu Category.');
    }
  },
  resetCategoryAvailability: function(categoryId) {
    check(categoryId, String);

    return MenuCategories.update(
      categoryId, {
        $set: {
          startTime: undefined,
          endTime: undefined,
          startMinutes: undefined,
          endMinutes: undefined
        }
      }, {
        validate: false
      }
    );
  }
});
