Package.describe({
  summary: "A package to retrieve markdown ressources in a github repository",
  version: "0.0.2",
  git: ""
});

Package.onUse(function (api, where) {
  api.use(['http', 'mrt:github'], 'server');

  api.add_files([
    'lib/server/github-key.js',
    'lib/server/github.js'
  ], 'server');

  api.export(['Repo']);
});

Package.on_test(function(api) {
  api.add_files([
    'lib/server/github-key.js',
    'lib/server/github.js'
  ], 'server');
  api.add_files('test_github-md.js', 'server');
  api.use(['tinytest', 'test-helpers', 'http'], 'server');
});
