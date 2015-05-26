Template.Page.helpers({
  pageAnimation: function () {
    return ResponsiveHelpers.isXs() ? 'fadeInRight' : 'fadeIn';
  }
});
