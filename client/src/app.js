App = function() {

    $(function() {
        iOS();
        widgetToggle();
        widgetClose();
        widgetFlip();
    });

    // if the user is using ios we want to know so we can adjust the header to account for the top bar
    var iOS = function() {
        var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
        var standalone = ("standalone" in window.navigator) && !window.navigator.standalone;
        Session.set('iOS-standalone', iOS && standalone);
    };

    var widgetToggle = function() {
        $(document).on('click', '.actions > .fa-chevron-down, .actions > .fa-chevron-up', function() {
            $(this).parent().parent().next().slideToggle("fast"), $(this).toggleClass("fa-chevron-down fa-chevron-up")
        });
    };

    var widgetClose = function() {
        $(document).on('click', '.actions > .fa-times', function() {
            $(this).parent().parent().parent().fadeOut()
        });
    };

    var widgetFlip = function() {
        $(document).on('click', ".actions > .fa-cog", function() {
            $(this).closest('.flip-wrapper').toggleClass('flipped')
        });
    };

    var dateRangePicker = function() {
        $('.reportdate').daterangepicker({
            format: 'YYYY-MM-DD',
            startDate: '2014-01-01',
            endDate: '2014-06-30'
        });
    };

    // TODO: Add Meteor PreLoader

    var spinStart = function(spinOn) {
        var spinFull = $('<div class="preloader"><div class="iconWrapper"><i class="fa fa-circle-o-notch fa-spin"></i></div></div>');
        var spinInner = $('<div class="preloader preloader-inner"><div class="iconWrapper"><i class="fa fa-circle-o-notch fa-spin"></i></div></div>');
        if (spinOn === undefined) {
            $('body').prepend(spinFull);
        } else {
            $(spinOn).prepend(spinInner);
        };

    };

    var spinStop = function() {
        $('.preloader').remove();
    };

    var maskInputs = function($selector) {
        $selector.each(function() {
            var mask = $(this).data('mask');
            $(this).mask(mask);
        });
    }

    var customCheckbox = function($selector) {
        $selector.iCheck({
            checkboxClass: 'icheckbox_flat',
            radioClass: 'iradio_flat'
        });
    }

    var colors = {
        default: "#FFFFFF",
        defaultDark: "#e6e6e6",
        primary: "#27B6AF",
        primaryDark: "#1e8c87",
        success: "#2ecc71",
        successDark: "#25a25a",
        warning: "#f39c12",
        warningDark: "#c87f0a",
        info: "#81cfe0",
        infoDark: "#58bfd6",
        danger: "#c0392b",
        dangerDark: "#962d22"
    }

    //return functions
    return {
        colors: colors,
        customCheckbox: customCheckbox,
        dateRangePicker: dateRangePicker,
        maskInputs: maskInputs,
        spinStart: spinStart,
        spinStop: spinStop
    };
}();
