Template.FormWysiwyg.rendered = function () {
  this.$('#summernote').summernote();
};

Template.FormWysiwyg.destroyed = function () {
  this.$("#summernote").destroy();
};