Devices = new Meteor.Collection('devices');

// Allow/Deny

Devices.allow({
  insert: function(userId, doc){
    return Roles.userIsInRole(userId, ['hotel-staff', 'admin']);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return Roles.userIsInRole(userId, ['hotel-staff', 'admin']);
  },
  remove:  function(userId, doc){
    return Roles.userIsInRole(userId, ['hotel-staff', 'admin']);
  }
});