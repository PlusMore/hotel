Template.editMenuItems.helpers({
  hasMenuItems: function () {
    return MenuItems.find().count() > 0;
  }
});