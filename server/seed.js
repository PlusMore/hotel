function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

Meteor.startup(function() {
  if (People.find().count() < 1) {
    for (i = 0; i < 100; i++) {
      var fakeuser = Fake.user({
        fields: ['name', 'surname', 'fullname', 'username']
      });
      fakeuser.date = randomDate(new Date(2015, 0, 1), new Date())

      People.insert(fakeuser);
    }
  }
});