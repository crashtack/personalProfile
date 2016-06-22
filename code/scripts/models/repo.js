(function(module) {
  var repos = {};

  repos.allRepos = [];

  repos.requestRepos = function(callback) {
    // TODO: Refactor this ajax method into a get method to the proxy
    //  'end point' provided by server.js.
    repos.requestRepos = function(callback) {
      $.get('/github/users/crashtack/repos' +
              '?per_page=10&sort=updated').done(function(data) {
                repos.allRepos = data;
              }).done(callback);


    // $.ajax({
    //   url: 'https://api.github.com/users/crashtack/repos' +
    //     '?per_page=10' +
    //     '&sort=updated',
    //   typeof: 'GET',
    //   headers: {'Authorization': 'token ' + githubToken},
    //   success: function(data) {
    //     console.log(data);
    //     repos.allRepos = data;
    //     callback();
    //   }
    //
    // });

  };

  repos.withTheAttribute = function(myAttr) {
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };




  module.repos = repos;
})(window);
