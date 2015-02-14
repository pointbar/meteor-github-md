# meteor-github-md

A basic module to load ressources from github

## Installation

```sh
$ meteor add pntbr:github-md
```

## How to use

First you can create a github repo :

```sh
$ meteor shell

> repo = new Repo('pointbar', 'meteor-github-md');
```

and play with his methods :

```sh
> repo.isAble
true

> repo.getFile('', 'README.md')

{
  "type": "file",
  "encoding": "base64",
  "size": 5362,
  "name": "README.md",
  "path": "README.md",
  "content": "encoded content ...",
  "sha": "3d21ec53a331a6f037a91c368710b99387d012c1",
  "url": "https://api.github.com/repos/pointbar/meteor-github-md/contents/README.md",
  "git_url": "https://api.github.com/repos//meteor-github-md/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
  "html_url": "https://github.com/pointbar/meteor-github-md/blob/master/README.md",
  "_links": {
  "git": "https://api.github.com/repos/pointbar/meteor-github-md/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
  "self": "https://api.github.com/repos//pointbar/meteor-github-md/contents/README.md",
  "html": " https://github.com/pointbar/meteor-github-md/blob/master/README.md"
  }
}

> dataInBase64 = repo.getFile('', 'README.md').data.content

> new Buffer(dataInBase64, 'base64').toString()
data
```

```js
repo = new Repo('pointbar', 'repo');
repo.isAble; // true if I can contact the repo
repo.getFile(folder, filename); // return a github json data file
repo.getFileList(folder); // return a github json list files
```

## Github authentification

The module support the [OAuth2 Key/Secret mode](https://developer.github.com/v3/#oauth2-keysecret)

You can add a file ignore by git :

```sh
$ touch server/github-key.js
```

And place the key/secret inside :
```js
github_md.key = '?client_id=xxxx&client_secret=yyyy';
```
## Contact

> http://scopyleft.fr

