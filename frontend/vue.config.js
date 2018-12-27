const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const PRE_RENDERED_ROUTES = require('./pre-rendered')

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, '../backend/public'),
    routes: PRE_RENDERED_ROUTES,
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      // We need to inject a value so we're able to
      // detect if the page is currently pre-rendered.
      inject: {},
      // Our view component is rendered after the API
      // request has fetched all the necessary data,
      // so we create a snapshot of the page after the
      // `data-view` attribute exists in the DOM.
      renderAfterElementExists: '[data-view]'
    })
  })
]

module.exports = {
<<<<<<< HEAD
  lintOnSave: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  },
=======
  lintOnSave: true
>>>>>>> 6067b0b906da55869d3c6fddd9503dce430ca5a7
}
