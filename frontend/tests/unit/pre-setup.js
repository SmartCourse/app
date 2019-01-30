// prettier compile fix from https://github.com/vuejs/vue-cli/issues/2128
// from @vue/cli-plugin-unit-mocha/setup.js
require('jsdom-global')(undefined, { pretendToBeVisual: true, url: 'http://localhost' })

// https://github.com/vuejs/vue-test-utils/issues/936
// better fix for "TypeError: Super expression must either be null or
// a function" than pinning an old version of prettier.
window.Date = Date
