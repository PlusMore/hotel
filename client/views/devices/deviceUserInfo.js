Template.deviceUserInfo.helpers({
  loggedOnWhen: function () {
    return moment(this.status.lastLogin).calendar();
  }
});