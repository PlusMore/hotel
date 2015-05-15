var device = Cluster.discoverConnection('device');
Meteor.methods({
  "authenticate": function(loginToken) {
    console.log('authenticate hotel connection');
    var userId = device.call('getUserByToken', loginToken);
    console.log(userId);
    this.setUserId(userId);
    return userId;
  }
});
