Meteor.methods({
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
  }
});
