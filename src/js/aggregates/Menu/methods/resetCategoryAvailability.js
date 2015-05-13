Meteor.methods({
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
      }
    );
  }
});
