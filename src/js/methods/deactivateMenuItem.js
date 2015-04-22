Meteor.methods({
  deactivateMenuItem: function(menuItemId) {
    // validate
    check(menuItemId, String);
    var menuItem = MenuItems.findOne(menuItemId);

    if (menuItem) {
      return MenuItems.update(
        menuItemId, {
          $set: {
            active: false
          }
        }, {
          validate: false
        }
      );
    } else {
      throw new Meteor.Error(500, 'Not a valid Menu Item.');
    }
  }
});
