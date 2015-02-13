var repoTest = new Repo('pointbar', 'multibao-test');

Tinytest.add("repo-test is able", function (test) {
  test.isTrue(repoTest.isAble);
});

Tinytest.add("get github ressource", function (test) {
  var path = repoTest.path + "README.md";
  var readme = repoTest.httpGetAsync(path, function (err, result) {
    return result;
  });

  test.equal(readme["statusCode"], 200);
});

Tinytest.add("get the files list", function (test) {
  test.isTrue(repoTest.getFilesList('contributions', repoTest.identity).data.length > 2);
});

Tinytest.add("get a file", function (test) {
  test.equal(repoTest.getFile('contributions', 'baba.md').data.name, 'baba.md');
});
