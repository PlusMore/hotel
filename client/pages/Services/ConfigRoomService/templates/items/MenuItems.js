Template.MenuItems.helpers({
  hasMenuItems: function() {
    return MenuItems.find({
      menuCategoryId: this._id
    }).count();
  },
  menuItemsForCategory: function() {
    return MenuItems.find({
      menuCategoryId: this._id
    }, {
      sort: {
        active: -1
      }
    });
  },
  isActive: function() {
    return this.active ? '' : '(Disabled)';
  }
});
