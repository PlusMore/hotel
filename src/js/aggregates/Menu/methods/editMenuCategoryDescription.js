Meteor.methods({
  editMenuCategoryDescription: function(description) {
    check(description, Schema.MenuCategoryDescription);
    return MenuCategories.update(description._id, {
      $set: _.omit(description, '_id')
    });
  }
});
