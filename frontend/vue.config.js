const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const PRE_RENDERED_ROUTES = require('../backend/pre-rendered')

const distDir = path.join(__dirname, '../backend/public')

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: distDir,
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
    }),
    postProcess (renderedRoute) {
      // Ignore any redirects.
      renderedRoute.route = renderedRoute.originalRoute
      // Basic whitespace removal. (Don't use this in production.)
      renderedRoute.html = renderedRoute.html.split(/<div id="app"/)
        .join('<div id="app" data-server-rendered="true"')
      // Remove /index.html from the output path if the dir name ends with a .html file extension.
      // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
      if (renderedRoute.route.endsWith('.html')) {
        renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
      }

      return renderedRoute
    },
  })
]



module.exports = {
  lintOnSave: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
      config.plugins.push(...productionPlugins)
    }
  }
}
