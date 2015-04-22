Meteor.methods({
  removeMenuItem: function(menuItemId) {
    check(menuItemId, String);

    var menuItem = MenuItems.findOne(menuItemId);

    if (menuItem) {
      MenuItems.remove(menuItemId);
    } else {
      throw new Meteor.Error(500, 'Not a valid Menu Item');
    }
  }
});
