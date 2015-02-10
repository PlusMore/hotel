configureMessenger = function(position, theme){
  var currentOptions,
      currentPosition,
      currentTheme,

  currentOptions = Messenger.options || undefined;
  currentTheme = currentOptions && currentOptions.theme || undefined;

  var classes = 'messenger-fixed';

  if (position && position.length > 0) {
    for (var i=0; i < position.length; i++) {
      classes += ' messenger-on-' + position[i];  
    }
  } else {
    classes = currentOptions.extraClasses;
  }

  theme = theme || currentTheme;

  $.globalMessenger({ extraClasses: classes, theme: theme });
  Messenger.options = { extraClasses: classes, theme: theme };
};

Meteor.startup(function() {
  var position = ['top', 'right'];
  var theme = 'air';

  configureMessenger(position, theme);
});
  