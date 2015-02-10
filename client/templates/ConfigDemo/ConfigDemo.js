Template.ConfigDemo.events({
  'click .config-link': function (e, tmpl) {
    if (tmpl.$(e.currentTarget).hasClass('open')) {
        tmpl.$('#config').animate({
            "right": "-205px"
        }, 150);
        tmpl.$(e.currentTarget).removeClass('open').addClass('closed');
    } else {
        tmpl.$("#config").animate({
            "right": "0px"
        }, 150);
        tmpl.$(e.currentTarget).removeClass('closed').addClass('open');
    }
  }, 
  'click .theme-style-wrapper': function (e, tmpl) {
    var themeValue = tmpl.$(e.currentTarget).data('theme');

    Session.set('theme', themeValue);
  }
});

var switchTheme = function() {
        $(document).on('click', '.theme-style-wrapper', function() {
            
        });
    };