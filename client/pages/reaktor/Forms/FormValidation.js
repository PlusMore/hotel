Template.FormValidation.rendered = function () {
  this.$('#form').validate({
    rules: {
        input1: {
            required: true
        },
        input2: {
            minlength: 5,
            required: true
        },
        input3: {
            maxlength: 5,
            required: true
        },
        input4: {
            required: true,
            minlength: 4,
            maxlength: 8
        },
        input5: {
            required: true,
            min: 5
        },
        input6: {
            required: true,
            range: [5, 50]
        },
        input7: {
            minlength: 5
        },
        input8: {
            required: true,
            minlength: 5,
            equalTo: "#input7"
        },
        input9: {
            required: true,
            email: true
        },
        input10: {
            required: true,
            url: true
        },
        input11: {
            required: true,
            digits: true
        },
        input12: {
            required: true,
            phoneUS: true
        },
        input13: {
            required: true,
            minlength: 5
        }
    },
    highlight: function(element) {
        $(element).closest('.form-group').removeClass('success').addClass('error');
    },
    success: function(element) {
        element.text('OK!').addClass('valid')
            .closest('.form-group').removeClass('error').addClass('success');
    }
  });
};