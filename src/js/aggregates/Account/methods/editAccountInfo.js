Meteor.methods({
  editAccountInfo: function(doc) {
    check(doc.userId, String);
    check(doc.firstName, String);
    check(doc.lastName, String);
    check(doc.email, String);

    var emailChanged = Meteor.users.findOne(doc.userId).email() != doc.email ? true : false;

    if (emailChanged) {

      var userWithSameEmail = Meteor.users.findOne({
        emails: {
          $elemMatch: {
            address: doc.email
          }
        }
      });
      if (userWithSameEmail) {
        throw new Meteor.Error(500, 'User with that email already exists');
      }

      var account = {
        "profile.firstName": doc.firstName,
        "profile.lastName": doc.lastName,
        "emails.0.address": doc.email
      };

      Meteor.users.update({
        _id: doc.userId
      }, {
        $set: account
      });
    } else {
      var account = {
        "profile.firstName": doc.firstName,
        "profile.lastName": doc.lastName
      };

      Meteor.users.update({
        _id: doc.userId
      }, {
        $set: account
      });
    }
  }
});
