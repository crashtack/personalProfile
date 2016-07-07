(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('.tab-content').hide();
    $('#content').fadeIn();

  };



  module.homeController = homeController;
})(window);
