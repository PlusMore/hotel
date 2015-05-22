randomScalingFactor = function() {
  return Math.round(Math.random() * 100)
};

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  };
}

Meteor.startup(function() {
  _.extend(Blaze.TemplateInstance.prototype, {
    findParentTemplate: function(templateName) {
      if (!/^Template\./.test(templateName))
        templateName = 'Template.' + templateName;
      var view = this.view;
      while (view.name !== templateName) {
        view = view.parentView;
        if (!view)
          return null;
      }
      return view.templateInstance();
    }
  });
});
