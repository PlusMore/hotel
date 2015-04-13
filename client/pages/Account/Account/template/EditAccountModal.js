Template.EditAccountModal.helpers({
  accountInfoSchema: function() {
    return Schema.AccountInformation;
  }
});

Schema.AccountInformation = new SimpleSchema({
  userId: {
    type: String
  },
  firstName: {
    type: String,
    label: "First Name"
  },
  lastName: {
    type: String,
    label: "Last Name"
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email"
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
    }
  },
});
