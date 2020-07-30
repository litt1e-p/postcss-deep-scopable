const fs = require('fs');
const path = require('path');
const test = require('ava');
const postcss = require('postcss');
const reporter = require('postcss-reporter');
const postcssDeepScopable = require('../');
// const postcssDeepScopable = require('../lib/index.js');
const testSel = '&&'
const testSels = ['&&', '%%']

test.cb('postcss-deep-scopable', t => {
  testFixture(t, 'input-none.css', 'output-none.css');
  t.end();
});

test.cb('postcss-deep-scopable-custom-selector-obj', t => {
  testFixture2(t, 'input-sel.css', 'output-sel.css');
  t.end();
});

test.cb('postcss-deep-scopable-custom-selector-str', t => {
  testFixture3(t, 'input-sel.css', 'output-sel.css');
  t.end();
});

test.cb('postcss-deep-scopable-custom-selector-sel-array', t => {
  testFixture4(t, 'input-array.css', 'output-array.css');
  t.end();
});

test.cb('postcss-deep-scopable-custom-selector-sel-array2', t => {
  testFixture5(t, 'input-array.css', 'output-array.css');
  t.end();
});

function fixture (name) {
  return fs.readFileSync(path.resolve(__dirname, './fixtures/' + name), 'utf8');
}

function testFixture (t, input, output) {
  const result = postcss([ postcssDeepScopable(), reporter() ]).process(fixture(input));
  t.is(result.css, fixture(output));
}

function testFixture2 (t, input, output) {
  const result = postcss([ postcssDeepScopable({
    sel: testSel
  }), reporter() ]).process(fixture(input));
  t.is(result.css, fixture(output));
}

function testFixture3 (t, input, output) {
  const result = postcss([ postcssDeepScopable(testSel), reporter() ]).process(fixture(input));
  t.is(result.css, fixture(output));
}

function testFixture4 (t, input, output) {
  const result = postcss([ postcssDeepScopable(testSels), reporter() ]).process(fixture(input));
  t.is(result.css, fixture(output));
}

function testFixture5 (t, input, output) {
  const result = postcss([ postcssDeepScopable({
    sels: testSels
  }), reporter() ]).process(fixture(input));
  t.is(result.css, fixture(output));
}