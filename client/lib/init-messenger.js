configureMessenger = function(position, theme) {
  var currentOptions,
    currentPosition,
    currentTheme,

    currentOptions = Messenger.options || undefined;
  currentTheme = currentOptions && currentOptions.theme || undefined;

  var classes = 'messenger-fixed';

  if (position && position.length > 0) {
    for (var i = 0; i < position.length; i++) {
      classes += ' messenger-on-' + position[i];
    }
  } else {
    classes = currentOptions.extraClasses;
  }

  theme = theme || currentTheme;

  $.globalMessenger({
    extraClasses: classes,
    theme: theme
  });
  Messenger.options = {
    extraClasses: classes,
    theme: theme
  };
};

messages = function() {
  var showSuccess = function(msg) {
    Messenger().post({
      message: msg,
      type: 'success',
      showCloseButton: true
    })
  }
  var showError = function(msg) {
    Messenger().post({
      message: msg,
      type: 'error',
      showCloseButton: true
    })
  }
  return {
    success: showSuccess,
    error: showError
  }
};

Meteor.startup(function() {
  var position = ['top', 'right'];
  var theme = 'air';

  configureMessenger(position, theme);

  Messages = new messages();

});