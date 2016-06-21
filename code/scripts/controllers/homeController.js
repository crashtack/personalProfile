(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('#articles').fadeIn();

  };



  module.homeController = homeController;
})(window);
