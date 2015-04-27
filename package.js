Package.describe({
  name: 'pntbr:github-md',
  version: '0.1.0',
  summary: 'Use Github API to get markdown files',
  git: 'https://github.com/pointbar/meteor-github-md',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('http', 'client');
  api.addFiles('github-md.js', 'client');
  api.export('GhRepo', 'client');
});

Package.onTest(function(api) {
  api.use(['github-md', 'tinytest', 'http'], 'client');
  api.addFiles('github-md-tests.js', 'client');
});
