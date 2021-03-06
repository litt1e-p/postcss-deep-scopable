# postcss-deep-scopable

[![npm version](https://badge.fury.io/js/postcss-deep-scopable.svg)](https://badge.fury.io/js/postcss-deep-scopable) [![Build Status](https://travis-ci.com/litt1e-p/postcss-deep-scopable.svg?branch=master)](https://travis-ci.com/litt1e-p/postcss-deep-scopable)

unified deep scoped style postcss plugin for vue

Note: This is not only supports a limited list of scoped less/sass|scss [selectors](https://vue-loader.vuejs.org/guide/scoped-css.html) but also supports custom selectors.

- /deep/
- `>>>`
- `> > >`
- your custom deep selectors

# Installation

```js
npm install --save postcss-deep-scopable
```

# Usage

```js
const postcss = require('postcss');
const postcssDeepScopable = require('postcss-deep-scopable');

postcss([ postcssDeepScopable() ]).process(myCss).css

// or add a custom deep css selector or selectors
postcss([ postcssDeepScopable('&scoped&') ]).process(myCss).css
postcss([ postcssDeepScopable(['&scoped&', '%reveal%']) ]).process(myCss).css

```

input example: custom selectors
```js
// input scss/less...
&scoped& .app, %reveal% .main {
  text-align: center;
  color: red;
}
```
output example
```js
// output css

::v-deep .app, ::v-deep .main {
  text-align: center;
  color: red;
}
```

# License

MIT
