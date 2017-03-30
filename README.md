# article-50-annotations

The UK government 's Article 50 notification – [annotated](https://ig.ft.com/article-50-annotated), March 29, 2017. 

Based on previous versions at [trump-first-address](https://github.com/ft-interactive/trump-first-address) and [federal-reserve-march-meeting-2017](https://github.com/ft-interactive/federal-reserve-march-meeting-2017).

[![Build Status][circle-image]][circle-url] [![Dependency Status][devdeps-image]][devdeps-url]

## Local

```
npm start
```

Build/compile, start a dev server and watches for changes.

# Deploy

1. Write code in a branch.
2. Make a PR. CI will automatically:
    * build and test the branch
    * deploy green builds to the review site
3. Do quick smoke testing of the review build
4. Get a code review. Once you get a thumbs up, merge into master.
5. CI will build, test and deploy a build to Production.


## Uses Starter Kit

This project was scaffolded with [Starter Kit @5c74128](https://github.com/ft-interactive/starter-kit/tree/5c74128).

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

Please note the MIT licence includes only the software, and does not cover any FT content made available using the software, which is copyright &copy; The Financial Times Limited, all rights reserved. For more information about re-publishing FT content, please contact our [syndication department](http://syndication.ft.com/).

<!-- badge URLs -->
[circle-url]: https://circleci.com/gh/ft-interactive/trump-first-address
[circle-image]: https://circleci.com/gh/ft-interactive/trump-first-address/tree/master.svg?style=shield

[devdeps-url]: https://david-dm.org/ft-interactive/trump-first-address#info=devDependencies
[devdeps-image]: https://img.shields.io/david/dev/ft-interactive/trump-first-address.svg?style=flat-square
