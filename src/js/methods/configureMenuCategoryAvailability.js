Meteor.methods({
  configureMenuCategoryAvailability: function(menuCategoryAvailabilityConfiguration) {
    check(menuCategoryAvailabilityConfiguration, Schema.menuCategoryAvailability);

    return MenuCategories.update(menuCategoryAvailabilityConfiguration._id, {
      $set: _.omit(menuCategoryAvailabilityConfiguration, '_id')
    }, {
      validate: false
    });
  }
});
