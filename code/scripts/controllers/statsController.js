(function(module) {
  var statsController = {};

  statsController.index = function() {
    $('.tab-content').hide();
    $('#stats').fadeIn();
  };

  module.statsController = statsController;
})(window);
