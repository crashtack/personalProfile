(function(module) {
  var repoView = {};
  /* TODO: Let's compile our new template!
       Save the result of invoking Handlebars in this 'repoCompiler' variable
       that we will pass to the append method below. */
  var repoCompiler = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());  // Finish the Handlebars method here!
    return template(repo);
  };

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      repos.withTheAttribute('name')  // TODO: experiment changing this attribute field!
      .map(function(repo) {
        console.log(repo);
        return repoCompiler(repo);
      })
    );
  };
/* TODO: Call the function that loads (or 'requests') our repo data.
    Pass in some view funcyion as a higher order callback, so our repos
    will render after the data is loaded. */




  module.repoView = repoView;
})(window);

repos.requestRepos(repoView.renderRepos);
