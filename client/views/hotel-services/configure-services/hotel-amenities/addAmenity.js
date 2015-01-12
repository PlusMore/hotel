Template.addAmenity.events({
  'click #add-new-amenity': function () {
    Session.set('showNewAmenityModal', true);
  }
});

Template.newAmenityModal.helpers({
	isVisible: function (){
		if(Session.get('showNewAmenityModal')){
			return true;
		} else {
			return false;
		}
	},
	isVisibleClass: function() {
	    if (Session.get('showNewAmenityModal')) {
	      return 'show in animated fadeInDown';
	    } else {
	      return 'hidden';
	    }
	},
	hotelId: function () {
		return Session.get('hotelId');
	}
});

Template.newAmenityModal.events({
    'click [data-dismiss="modal"]':function(){
    	Session.set('showNewAmenityModal', false);
  	}
});

Template.amenityTimePicker.rendered = function () {
  this.$('.timepicker').pickatime({
    onSet: function(selection) {
      var minutes = selection.select;
      var controlName = this.$node.attr('name');
      var $form = this.$node.closest('form');
      if (controlName === 'startTime') {
        $form.find('[name=startMinutes]').val(minutes);
      } else if (controlName === 'endTime') {
        $form.find('[name=endMinutes]').val(minutes);
      }
    }
  });
};

AutoForm.hooks({
  	newAmenity: {
	    // Called when any operation succeeds, where operation will be
	    // "insert", "update", "remove", or the method name.
	    onSuccess: function(operation, result, template) {
	        console.log('success');
	        Session.set('showNewAmenityModal', false);
	    }, 

	    // Called when any operation fails, where operation will be
	    // "validation", "insert", "update", "remove", or the method name.
	    onError: function(operation, error, template) {
	        if (operation !== 'validation') {
	        	Errors.throw(error.message);
	        	console.log('error');
	        }
	    },

	    // Called at the beginning and end of submission, respectively.
	    // This is the place to disable/enable buttons or the form,
	    // show/hide a "Please wait" message, etc. If these hooks are
	    // not defined, then by default the submit button is disabled
	    // during submission.
	    beginSubmit: function(formId, template) {
	        // disable button
	        // change text to 'submitting'
	        console.log('begin submit');
	    },
	    endSubmit: function(formId, template) {
	        // enable button
	        console.log('end submit');
	    }
	}
});