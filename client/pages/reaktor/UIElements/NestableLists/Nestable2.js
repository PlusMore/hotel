Session.setDefault('nestable2Output', "{}");

Template.Nestable2.rendered = function () {
  // activate Nestable for list 1
  this.$('#nestable2').nestable({
          group: 1
      })
      .on('change', updateOutput)
      .trigger('change');

};

Template.Nestable2.helpers({
  output: function () {
    return Session.get('nestable2Output');
  }
});

Template.Nestable2.events({
  'click #nestable-menu': function (e, tmpl) {
    var target = $(e.target),
        action = target.data('action');

      if (action === 'expand-all') {
          $('.dd').nestable('expandAll');
      }
      if (action === 'collapse-all') {
          $('.dd').nestable('collapseAll');
      }
  }
});

var updateOutput = function(e) {
    var list = e.length ? e : $(e.target);
    var jsonSerializedList;

    if (window.JSON) {
        jsonSerializedList = window.JSON.stringify(list.nestable('serialize'));
    } else {
        jsonSerializedList = 'JSON browser support required for this demo.';
    }

    Session.set('nestable2Output', jsonSerializedList);
};