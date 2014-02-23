# Beer Catalog
The Beer Catalog uses crowd-sourced data maintained by BreweryDB and built on an angular-seed project and the MEAN stack - [MongoDB](http://www.mongodb.org/), [Express](http://expressjs.com/), [AngularJS](http://angularjs.org/), and [Node.js](http://www.nodejs.org/).

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).
* BreweryDB - Obtain a free API key from [BreweryDB](http://www.brewerydb.com/developers) - Add the key to [env.json](env.json) file. Protect your personal key, don't commit it to the repository.

### Tools Prerequisites
* NPM - Node.js package manager, should be installed when you install node.js.


## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Request - Defined as npm module in the [package.json](package.json) file.
* Underscore - Defined as npm module in the [package.json](package.json) file.
* Underscore.string - Defined as npm module in the [package.json](package.json) file.
* http-proxy - Defined as npm module in the [package.json](package.json) file.
* mongodb - Defined as npm module in the [package.json](package.json) file.
* mongoskin - Defined as npm module in the [package.json](package.json) file.
* moment - Defined as npm module in the [package.json](package.json) file.

* AngularJS - Included via CDN in the [index.html](index.html) file.
* Twitter Bootstrap - Included via CDN in the [index.html](index.html) file.
* jQuery - Included via CDN in the [index.html](index.html) file.
* Underscore - Included via CDN in the [index.html](index.html) file.


## Quick Install
  The quickest way to get started with Beer Cat is to clone the project and utilize it like this:

  Install dependencies:

    $ npm install

  Start the server:

    $ node server

  Then open a browser and go to:

    http://localhost:3000


## Troubleshooting
During install some of you may encounter some issues, most of this issues can be solved by one of the following tips..
If you went through all this and still can't solve the issue, feel free to add to the repository issue tracker.

#### Update NPM
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*, usually updating those tools to the latest version solves the issue.

Updating NPM:
```
$ npm update -g npm
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

NPM Clean Cache:
```
$ npm cache clean
```
