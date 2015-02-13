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

> repo = new Repo('pointbar', 'repo');
```

and play with his methods :

```sh
> repo.isAble
true

> repo.getFile('', 'README.md')
{json}

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
