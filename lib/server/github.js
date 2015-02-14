// Use for github simple authentification
github_md = {
  client_id: '',
  client_secret: '',
  getKey: function () {
    if (! (this.client_id || this.client_secret)) {
      return '';
    }

    return '?client_id=' + this.client_id + '&client_secret=' + this.client_secret;
  }
}

Repo = function Repo(owner, repo) {
  this.path = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/';
  this.isAble = this.isAble();
  this.identity = {owner: owner, repo: repo};
}

Repo.prototype.httpGetAsync = function (url, apply) {
  var Future = Npm.require('fibers/future');
  var future = new Future();
  
  Meteor.http.get(url + github_md.getKey(), {headers: {"User-Agent": "Meteor/1.0"}}, function(error, result) {
    future.return(apply(error, result));
  });

  return future.wait();
}

Repo.prototype.isAble = function () {
  return this.httpGetAsync(this.path, function (error, result) {
    return result.statusCode === 200;
  });
}

Repo.prototype.getFilesList = function (folder) {
  var url = this.path + folder;

  return this.httpGetAsync(url, function (error, result) {
    if (error) {
      console.warn(
          "getFilesList-error", "Error: " + error
        + "Url: " + url
      );

      return undefined;
    }

    return result;
  });
}

Repo.prototype.getFile = function (folder, filename) {
  var url = this.path + folder + '/' + filename;

  return this.httpGetAsync(url, function (error, result) {
    if (error) {
      console.warn(
          "getFile-error", "Error: " + error
        + "Url: " + url
      );

      return undefined;
    }

    return result;
  });
}
