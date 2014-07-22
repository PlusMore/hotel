Accounts.emailTemplates.siteName = "Plus More";
Accounts.emailTemplates.from = "noreply@plusmoretablets.com";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Plus More";
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "To activate your account, simply click the link below:\n\n"
     + url;
};

Accounts.validateLoginAttempt(function(attempt) {
  if (!attempt.allowed) {
    return false;
  } 

  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      throw new Meteor.Error(300, 'Please verify your email address by clicking the link in the verification email that was sent to ' + attempt.user.emails[0].address + '.');
      return false;
    } else {
      return true;
    }
  }
});

Accounts.onLoginFailure(function (attempt) {
  if (attempt.user) {
    if (!attempt.user.emails[0].verified) {
      Accounts.sendEnrollmentEmail(attempt.user._id)
    } 
  }
})