(function(module) {
  var repos = {};

  repos.allRepos = [];

  repos.requestRepos = function(callback) {
    /* TODO: How would you like to fetch your repos? Someone say AJAX?!
      Do not forget to call the callback! */
    $.ajax({
      url: 'https://api.github.com/users/codefellows-seattle-301d7/repos' +
        '?per_page=10' +
        '&sort=updated',
      typeof: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        console.log(data);
        repos.allRepos = data;
        callback();
      }

    });

  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };




  module.repos = repos;
})(window);
