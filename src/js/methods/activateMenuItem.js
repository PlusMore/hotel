Meteor.methods({
  activateMenuItem: function(menuItemId) {
    // validate
    check(menuItemId, String);
    var menuItem = MenuItems.findOne(menuItemId);

    if (menuItem) {
      return MenuItems.update(
        menuItemId, {
          $set: {
            active: true
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
