Template.Header.helpers({
  accountName: function() {
    var user = Meteor.user();
    if (user.kiosk) {
      return user.kiosk.name;
    }
    return "{0} {1}".format(user.profile.firstName, user.profile.lastName);
  },
  accountAvatar: function() {
    var user = Meteor.user();
    return user.profile.avatar || "/img/profile.jpg";
  }
});

Template.Header.events({
  'click #toggle-right': function() {
    $('#sidebar-right').toggleClass('sidebar-right-open');
    $("#toggle-right .fa").toggleClass("fa-indent fa-dedent");
  },
  'click #toggle-left': function() {
    var bodyEl = $('#main-wrapper');
    ($(window).width() > 767) ? $(bodyEl).toggleClass('sidebar-mini'): $(bodyEl).toggleClass('sidebar-opened');
  },
  'click #toggle-profile': function() {
    $('.sidebar-profile').slideToggle();
  },
  'click #logout': function(e) {
    e.preventDefault();
    Meteor.logout();
  },
  'click #account-dropdown': function(e) {
    e.preventDefault();
  }
});
