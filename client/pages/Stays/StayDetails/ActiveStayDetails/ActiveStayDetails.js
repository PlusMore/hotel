Template.ActiveStayDetails.helpers({
  changeCheckoutSchema: function() {
    return Schema.ChangeCheckoutDate;
  },
  pickadateOptions: function() {
    return {
      container: $("#main-wrapper"),
      // can not change checkout date before todays date or checkInDate
      min: Math.max(this.checkInDate, new Date())
    };
  },
  users: function() {
    return Template.instance().users();
  },
});

Template.ActiveStayDetails.events({
  'click #checkout-guest': function(e) {
    e.preventDefault();
    if (confirm("Are you sure you wish to end this stay?")) {
      Meteor.call('endStay', this._id, function(err) {
        if (err) {
          Messages.error(err.message);
        } else {
          Messages.success("Successfully ended Stay");
          BootstrapModalPrompt.dismiss();
        }
      });
    }
  }
});

Template.ActiveStayDetails.created = function() {
  var instance = this;

  instance.autorun(function() {
    var sub = Meteor.subscribe('usersForStayId', Session.get('viewStayId'));
  });

  instance.users = function() {
    var stay = Stays.findOne(Session.get('viewStayId'));
    if (stay && stay.users) {
      return Meteor.users.find({
        _id: {
          $in: stay.users
        }
      });
    }
  }
};

Template.ActiveStayDetails.rendered = function() {
  this.$('.timepicker').pickatime({
    container: $("#main-wrapper"),
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
    beginSubmit: function() {
      this.template.$("#edit-stay-submit").prop('disabled', true);
    },
    endSubmit: function() {
      this.template.$("#edit-stay-submit").prop('disabled', false);
    }
  }
});
