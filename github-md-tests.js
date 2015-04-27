var repoTest = new GhRepo('daktary', 'contribs', 'gh_pages');
var BASE_URL = 'https://api.github.com/repos/' +
              '{account}/{repo}/contents/{path}';

// PUBLIC sync
Tinytest.add(
  "Build URL to retrieve css stylesheet with repository's parameters",
  function (test) {
    var answer = 'https://rawgit.com/daktary/contribs/gh_pages/style.css';

    GhRepo.cssUrl = 'https://rawgit.com/{account}/{repo}/{branch}/{path}';
    test.equal(repoTest.createCssUrl('style.css'), answer);
});

// PRIVATE sync
Tinytest.add(
  "Decode Base64 and escape string",
  function (test) {
    var base64Content = "IyBBbGwgVGhhdA";
    var answer = "# All That";

    test.equal(repoTest.cleanContent(base64Content), answer);
});

Tinytest.add(
  "Build an URL with repository's parameters",
  function (test) {
    var answer =
      'https://api.github.com/repos/daktary/contribs/contents/brebis.md';

    test.equal(repoTest.replaceUrlParameters(BASE_URL, 'brebis.md'), answer);
});

Tinytest.add(
  "Add query branch to URL",
  function (test) {
    var answer = BASE_URL + '?ref=gh_pages';

    test.equal(repoTest.addBranchToUrl(BASE_URL), answer);
});

// PUBLIC async

Tinytest.addAsync(
  "Get a ressource from Github",
  function(test, onComplete){
    var repoTest2 = new GhRepo('daktary', 'contribs');
    var path = 'contributions/wallace.md';
    var answer = "# All That";

    repoTest2.getCleanContent(path, function (content) {
      test.equal(content.substr(0, 10), answer);
      onComplete();
    });
});

// PRIVATE async
Tinytest.addAsync(
  'Get base64 content from Github',
  function(test, onComplete){
    var url = 'https://api.github.com/repos/' +
      'daktary/contribs/contents/contributions/wallace.md';

    repoTest.getFile(url, function (content) {
      test.isTrue(content.length > 10000);
      onComplete();
    });
});

Tinytest.addAsync(
  "Add keys to an URL for github authentification",
  function(test, onComplete){
    var url = 'http://api.github.com';
    var answer = 'http://api.github.com';

    repoTest.addAuthToUrl(url, function (result) {
      test.equal(result, answer);
      onComplete();
    });
});
