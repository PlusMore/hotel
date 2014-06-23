/* ---------------------------------------------------- +/

## Items ##

All code related to the Items collection goes here.

/+ ---------------------------------------------------- */

Categories = new Meteor.Collection('categories')
// Allow/Deny

Categories.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['admin']);
  }
});
