Template.StayDetailsModal.helpers({
  stay: function() {
    return Stays.findOne(Session.get('viewStayId'));
  },
  users: function() {
    return Template.instance().users();
  },
  changeCheckoutSchema: function() {
    return Schema.ChangeCheckoutDate;
  },
  pickadateOptions: function() {
    return {
      // can not change checkout date before todays date or checkInDate
      min: Math.max(this.checkInDate, new Date())
    };
  }
});

Template.StayDetailsModal.created = function() {
  var instance = this;

  instance.autorun(function() {
    var sub = Meteor.subscribe('usersForStayId', Session.get('viewStayId'));
  });

  instance.users = function() {
    var stay = Stays.findOne(Session.get('viewStayId'));
    if (stay && stay.users) {
      return Meteor.users.find({_id: {$in: stay.users}});
    }
  }
};

Template.StayDetailsModal.rendered = function() {
  this.$('.timepicker').pickatime({
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $form = this.$node.closest('form');
      if (controlName === 'checkoutTime') {
        $form.find('[name=checkoutMinutes]').val(minutes);
      }
    }
  });
};

AutoForm.hooks({
  changeCheckoutDate: {
    before: {
      changeCheckoutDate: function(doc, template) {
        //return doc; (synchronous)
        //return false; (synchronous, cancel)
        //this.result(doc); (asynchronous)
        //this.result(false); (asynchronous, cancel)
        var stay = Stays.findOne(doc._id);
        var checkoutDate = moment(doc.checkoutDate).zone(stay.zone).format('dddd, MM/DD');
        if (confirm("Change the checkout date to " + checkoutDate + " at " + doc.checkoutTime + "?")) {
          return doc;
        }
        return false;
      }
    },
    // Called when any operation succeeds, where operation will be
    // "insert", "update", "submit", or the method name.
    onSuccess: function(operation, result, template) {
      Messages.success('Successfully changed checkout date!');
      BootstrapModalPrompt.dismiss();
    },

    // Called when any operation fails, where operation will be
    // "validation", "insert", "update", "submit", or the method name.
    onError: function(operation, error, template) {
      if (operation !== "validation") {
        Messages.error(error.message);
      }
    },
  }
});
