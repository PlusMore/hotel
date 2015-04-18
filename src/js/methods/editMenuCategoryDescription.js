Meteor.methods({
  editMenuCategoryDescription: function(description) {
    check(description, Schema.menuCategoryDescriptionSchema);
    return MenuCategories.update(description._id, {
      $set: _.omit(description, '_id')
    }, {
      validate: false
    });
  }
});
