Meteor.methods({
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
  }
});
