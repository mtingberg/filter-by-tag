# Contributing to filter-by-tag

### Overview

This project is written using the OO features found in JavaScript and using no explicit module
system (e.g. AMD, CommonJS, ...). Separation of logic is instead implemented via the
[Module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)
as described in [Addy Osmani's JavaScript design patterns book](http://addyosmani.com/resources/essentialjsdesignpatterns/book/).

The project has two external dependencies: [jquery](http://jquery.com/) for DOM manipulation and
[underscorejs](http://underscorejs.org/) for ES5 backward compatibility (among other useful
things). These two libraries were chosen to be kept separate for keeping down the size of the build.


### Build a local copy of filter-by-tag

Create a fork of the filter-by-tag repo on github at https://github.com/mtingberg/filter-by-tag

Change directory to your repositories directory, e.g.:

```bash
$ cd /path/to/repos/
```

Clone your filter-by-tag fork to work locally

```bash
$ git clone git@github.com:username/filter-by-tag.git
```

Add the filter-by-tag master as a remote, e.g.: "upstream"

```bash
$ cd filter-by-tag
$ git remote add upstream git@github.com:mtingberg/filter-by-tag.git
```

Regularly pull from the "upstream" master to stay up to date as filter-by-tag receives new commits

```bash
$ git pull upstream master
```

Conclude by performing the following setup steps:

```bash
$ npm install
$ bower install
$ grunt setup-devenv
```

### Build the project

```bash
$ grunt build
```

### Full build

All build steps, including creating the `example` dir.

```bash
$ grunt build
```

### Execute unit tests

(Also part of other grunt tasks).

```bash
$ grunt test
```

### Run a local server with file watching and live reload

```bash
$ grunt server
```

### Creating a new feature or enhancement

Please follow the general style of coding in the project. The code adheres to
[Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
with the exception of:

* lowercased-file-names-divided-by-hyphens instead of CamelCasedFileNames.

Please also add unit tests for the changes submitted (feature.spec.js).


### Submitting a pull request

Push to your fork and submit a pull request. Please provide some explanation of
the changes you made.
