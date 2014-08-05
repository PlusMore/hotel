Template.editMenuItems.helpers({
  hasMenuItems: function() {
    return MenuItems.find({menuCategoryId: this._id}).count();
  },
  menuItemsForCategory: function () {
    return MenuItems.find({menuCategoryId: this._id});
  }
});