Package.describe({
  name: 'pntbr:github-md',
  summary: "A basic package to retrieve markdown ressources in a github repository",
  version: "0.0.6",
  git: "https://github.com/pointbar/meteor-github-md.git"
});

Package.onUse(function (api, where) {
  api.versionsFrom('1.0.3.1');
  api.use(['http'], 'server');

  api.add_files('lib/server/github.js', 'server');

  api.export(['Repo', 'github_md']);
});

Package.on_test(function(api) {
  api.add_files([
    'lib/server/github.js'
  ], 'server');
  api.add_files('test_github-md.js', 'server');
  api.use(['tinytest', 'test-helpers', 'http'], 'server');
});
