const postcss = require('postcss');
const dp_reg = /\/deep\//g;
const dp_reg1 = />>>/g
const dp_reg2 = />\s{0,}>\s{0,}>\s{0,}/g
const rp = '::v-deep '

function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function exec (s, v, p) {
  if (Object.prototype.toString.call(v) === '[object String]') {
    return replaceAll.apply(v, arguments);
  } else if (Object.prototype.toString.call(v) === '[object Array]') {
    return v.reduce((pr, c) => replaceAll.apply(c, [pr, c, p]), s);
  } else {
    throw new TypeError('String type of sel required');
  }
}

module.exports = postcss.plugin('postcss-deep-scopable', (options) => {
  return root => {
    root.walkRules(function(rule) {
      var temp = rule.selector;
      if (dp_reg.test(rule.selector)) {
        temp = rule.selector.replace(dp_reg, rp);
      } else if (dp_reg1.test(rule.selector)) {
        temp = rule.selector.replace(dp_reg1, rp);
      } else if (dp_reg2.test(rule.selector)) {
        temp = rule.selector.replace(dp_reg2, rp);
      } else if (options && !options.sels && ['[object String]', '[object Object]'].includes(Object.prototype.toString.call(options))) {
        temp = exec.apply(options.sel || options, [rule.selector, options.sel || options, rp])
      } else if (options && (Object.prototype.toString.call(options) === '[object Array]' || (options.sels && Object.prototype.toString.call(options.sels) === '[object Array]'))) {
        var sels;
        if (Object.prototype.toString.call(options) === '[object Array]') {
          sels = options;
        } else if (options.sels && Object.prototype.toString.call(options.sels) === '[object Array]') {
          sels = options.sels;
        }
        if (sels) {
          temp = exec.apply(sels, [rule.selector, sels, rp]);
        }
      }
      rule.selector = temp;
    });
  };
});
