Template.LocationSelector.helpers({
  bits: function () {
    return [
      'top left',
      'top right',
      'top',
      'bottom left',
      'bottom right',
      'bottom'
    ];
  }
});

Template.LocationSelector.events({
  'click .bit': function (e, tmpl) {
    var $bit = tmpl.$(e.currentTarget);
    var position = $bit.data('position').split(' ');

    configureMessenger(position);
  }
});