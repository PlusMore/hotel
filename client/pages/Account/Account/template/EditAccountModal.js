Template.EditAccountModal.helpers({
  accountInfoSchema: function() {
    return Schema.AccountInformation;
  }
});

Template.EditAccountModal.onRendered(function() {
  this.$progressButton = this.$('.progress-button');
  this.$progressButton.progressInitialize();
});

AutoForm.hooks({
  editAccountForm: {
    before: {
      method: function(doc) {
        this.template.findParentTemplate('EditAccountModal').$progressButton.progressStart();
        return doc;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result) {
      Messages.success('Successfully updated your account!');
      this.template.findParentTemplate('EditAccountModal').$progressButton.progressFinish();
      BootstrapModalPrompt.dismiss();
    },
    onError: function(operation, error) {
      Messages.error(error.reason);
      this.template.findParentTemplate('EditAccountModal').$progressButton.progressError();
    }
  },
});
