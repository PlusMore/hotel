Template.EditAccountModal.helpers({
  accountInfoSchema: function() {
    return Schema.AccountInformation;
  }
});

AutoForm.hooks({
  editAccountForm: {
    before: {
      method: function(doc) {
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully updated your account!');
      BootstrapModalPrompt.dismiss();
    },
    onError: function(operation, error) {
      Messages.error(error.reason);
    },
    beginSubmit: function() {
      this.template.$("#edit-account-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#edit-account-submit").prop('disabled', false);
    }
  },
});
