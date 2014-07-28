Template.newMenuCategoryModal.helpers({
  isVisibleClass: function() {
    if (Session.get('showNewMenuCategoryModal')) {
      return 'show in';
    } else {
      return 'hidden';
    }
  }, 
  hotelId: function() {
    return Session.get('hotelId');
  }
});

Template.newMenuCategoryModal.events({
  'click [data-dismiss="modal"]':function(){
    Session.set('showNewMenuCategoryModal', false);
  }
});

Template.addMenuCategory.events({
  'click #add-menu-category': function () {
    Session.set('showNewMenuCategoryModal', true);
  }
});