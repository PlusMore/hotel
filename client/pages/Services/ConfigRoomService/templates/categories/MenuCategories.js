Template.MenuCategories.helpers({
  menuCategories: function() {
    return MenuCategories.find({
      hotelId: Session.get('hotelId')
    });
  }
});
