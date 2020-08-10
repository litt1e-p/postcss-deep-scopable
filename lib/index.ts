const postcss = require('postcss');
const dp_reg: RegExp = /\/deep\//g;
const dp_reg1: RegExp = />>>/g
const dp_reg2: RegExp = />\s{0,}>\s{0,}>\s{0,}/g
const rp: string = '::v-deep '

type ExecNever = Array<string> | never

function escapeRegExp(s: string): string {
  return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str: string, find: string, replace: string): string {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function exec (s: string, v: Array<string>, p: string): ExecNever {
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
      var temp: string = rule.selector;
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
