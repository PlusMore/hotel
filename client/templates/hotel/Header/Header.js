Template.Header.helpers({
  user: function() {
    return Meteor.users.findOne(Meteor.userId());
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
