Meteor.publish('hotelMenu', function(hotelId) {
  var userId = this.userId,
    user = Meteor.users.findOne(userId);

  hotelId = hotelId || user.hotelId;
  if (Roles.userIsInRole(this.userId, ['hotel-manager', 'admin'])) {
    var hotel = Hotels.find(hotelId);
    if (hotel) {

      var publication = new SimplePublication({
        subHandle: this,
        collection: MenuCategories,
        selector: {
          hotelId: hotelId
        },
        dependant: new SimplePublication({
          subHandle: this,
          collection: MenuItems,
          foreignKey: 'menuCategoryId'
        })
      }).start();
    }
  }
});
