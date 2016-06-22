(function(module) {
  var indexView = {};

  indexView.renderIndexPage = function() {
    $('#ajax-spinner').fadeOut();
    Content.allContent.forEach(function(a) {
      $('#content').append(a.toHtml('#content-template'));
    });

  };

  indexView.renderIndexPage();

  module.indexView = indexView;
})(window);
