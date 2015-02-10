function showSuccess(msg){
  Messenger().post({
   message: msg,
  type: 'success',
    showCloseButton: true
  });
}

function showError(msg){
 Messenger().post({
   message: msg,
  type: 'error',
    showCloseButton: false
  });
} 

function tryAgain(){
  var i = 0;
  Messenger().run({
    errorMessage: 'Error destroying alien planet',
    successMessage: 'Alien planet destroyed!',
    action: function(opts) {
      if (++i < 3) {
        return opts.error({
          status: 500,
          readyState: 0,
          responseText: 0
        });
      } else {
        return opts.success();
      }
    }
  });
}

Template.Notifications.events({
  'click .js-retry-message': function () {
    tryAgain();
  },
  'click .js-error-message': function () {
    showError('Houston, we have a problem.');
  },
  'click .js-success-message': function () {
    showSuccess('We have lift off!');
  }
});