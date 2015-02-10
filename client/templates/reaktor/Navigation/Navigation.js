Template.Navigation.helpers({
  currentRouteClass: function (routeName) {
    // if page is current route, also return true 
    var currentRouter = Router.current();

    if (currentRouter && currentRouter.route.getName().indexOf(routeName) > -1) {
      return 'active';
    }

    return '';
  },
  stateClass: function(state) {
    var currentState = Session.get('state') || "";

    // if session state matches return true
    if (currentState.indexOf(state) > -1) {
      return 'open';
    }

    return '';
  },
  navSubStateClass: function(state) {
    // Can't get animations to work completely, tabling for now

    // var currentState = Session.get('state') || "";
    // var collapsingState = Session.get('collapsing') || "";
    // // if session state matches return true
    // if (currentState.indexOf(state) > -1) {
    //   return 'in';
    // }

    // if (collapsingState.indexOf(state) > -1) {
    //   return 'collapsing'
    // }

    return '';
  }
});

Template.Navigation.events({
  'click li.disabled > a': function(e, tmpl) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  },
  'click [data-state]': function (e, tmpl) {
    var currentState = Session.get('state');
    var state = tmpl.$(e.currentTarget).data('state');

    // // if toggle is open, then a section may need to be collapsed
    // if (currentState) {
    //   Session.set('collapsing', currentState);
    //   Meteor.setTimeout(function() {
    //     Session.set('collapsing', undefined);
    //   }, 500);
    // }

    if (currentState === state) {
      Session.set('state', undefined);
    } else {
      Session.set('state', state);
    }
  },
  
});