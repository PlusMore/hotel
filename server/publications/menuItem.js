Meteor.publish('menuItem', function(id) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    var menuItem = MenuItems.findOne(id);
    if (menuItem) {
      return [
        MenuItems.find(id),
        MenuCategories.find(menuItem.menuCategoryId)
      ];
    }
  }
});
