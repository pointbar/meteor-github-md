/*
  Use Github API to get content of markdown files

  Url example :
https://api.github.com/repos/daktary/contribs/contents/contributions/walace.md?client_id=xxxxxxx&client_secret=yyyyyy&ref=gh_pages
*/

GhRepo = function GhRepo(account, repo, branch) {
  this.account = account;
  this.repo = repo;
  this.branch = branch || 'master';
};

GhRepo.BASE_URL =
  'https://api.github.com/repos/{account}/{repo}/contents/{path}';
GhRepo.CSS_URL =
  'https://rawgit.com/{account}/{repo}/{branch}/{path}';
GhRepo.GH_KEYS = 'gh-keys.json';

/*
  PUBLIC
*/
GhRepo.prototype.getCleanContent = function (path, callback) {
  var self = this;
  var url = self.replaceUrlParameters(GhRepo.BASE_URL, path);

  url = self.addBranchToUrl(url);

  self.addAuthToUrl(url, function (url) {
    self.getFile(url, function(rawContent) {
      var cleaned = self.cleanContent(rawContent);

      callback(cleaned);
    });
  });
};

GhRepo.prototype.createCssUrl = function (path) {
  return GhRepo.CSS_URL
    .replace('{account}', this.account)
    .replace('{repo}', this.repo)
    .replace('{branch}', this.branch)
    .replace('{path}', path);
};

/*
  PRIVATE
*/
GhRepo.prototype.getFile = function (url, callback) {
  HTTP.get(url, function (error, result) {
    if (error) {
      throw new Meteor.Error("ressource not found", error);
    }

    callback(result.data.content);
  });
};

GhRepo.prototype.replaceUrlParameters = function (url, path) {
  return url
    .replace('{account}', this.account)
    .replace('{repo}', this.repo)
    .replace('{branch}', this.branch)
    .replace('{path}', path);
};

GhRepo.prototype.addBranchToUrl = function (url) {
  return url + (url.match(/\?/) ? '&' : '?') + 'ref=' + this.branch;
};

GhRepo.prototype.addAuthToUrl = function (url, callback) {
  HTTP.get(Meteor.absoluteUrl() + GhRepo.GH_KEYS, function (err, result) {
    var authQuery = url;

    if (result.data) {
      authQuery += (url.match(/\?/) ? '&' : '?') +
                   'client_id=' + result.data.id +
                   '&client_secret=' + result.data.secret;
    }

    callback(authQuery);
  });
};

GhRepo.prototype.cleanContent = function (content) {
  content = content.replace(/\s/g, '');

  return decodeURIComponent(escape(atob(content)));
};
