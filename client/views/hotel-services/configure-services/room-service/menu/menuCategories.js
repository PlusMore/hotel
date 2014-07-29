Template.menuCategories.helpers({
  menuCategories: function () {
    return MenuCategories.find({hotelId: Session.get('hotelId')});
  }
});