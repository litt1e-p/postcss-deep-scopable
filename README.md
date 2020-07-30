# postcss-deep-scopable

[![npm version](https://badge.fury.io/js/postcss-deep-scopable.svg)](https://badge.fury.io/js/postcss-deep-scopable) [![Build Status](https://travis-ci.com/litt1e-p/postcss-deep-scopable.svg?branch=master)](https://travis-ci.com/litt1e-p/postcss-deep-scopable)

unified deep scoped style postcss plugin for vue

Note: This currently only supports a limited list of scoped css [selectors](https://vue-loader.vuejs.org/guide/scoped-css.html)

- /deep/
- `>>>`
- `> > >`
- also your custom deep selectors

# Installation

```js
npm install --save postcss-deep-scopable
```

# Usage

```js
const postcss = require('postcss');
const postcssDeepScopable = require('postcss-deep-scopable');

postcss([ postcssDeepScopable() ]).process(myCss).css
```

# License

MIT
