# meteor-github-md

With this lib you can use Github as a content editor with git powers and Github benefits. Please let me know your usage.

## Installation

```sh
$ meteor add pntbr:github-md
```

## How to use

First you must create a github repository :

1. open a console in your navigator

```javascript
> repo = new GhRepo('daktary', 'contribs', 'gh-pages');
```

In order: *account*, *repo*, *branch (default: master)*

2. Get a ressource

```javascript
> repo.getCleanContent("walace.md", function (content) { console.log("content", content); });
```

## Github authentification

The module support the [OAuth2 Key/Secret mode](https://developer.github.com/v3/#oauth2-keysecret) to understand.

You can add a file :

```sh
$ touch client/gh-keys.json
$ echo client/gh-keys.json >> .gitignore
```

Place the key/secret inside :

```json
{
  "id": "4a39xxxxxx546",
  "secret": "3cfbxxxxxxf60"
}
```

## Contribute

Many ways to contribute:

* submit an issue when you find a bug
* suggest new ideas
* fork this repo and implement your features
* improve the code or demo
* find typos
* letting me know how you use it

## License

MIT

## Contact

> stephane@scopyleft.fr
> http://scopyleft.fr
