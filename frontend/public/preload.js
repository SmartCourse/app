(function () {
  class Loader {
    constructor(el, root) {
      this._loaded = 0
      this._started = 0
      this.$el = el
      this.$root = root
    }

    startLoad(item) {
      if (this._started === 0) {
        this.startTime = Date.now()
      }
      console.info(`Loading ${item}`)
      this._started += 1
    }

    endLoad() {
      console.info('Done')
      this._loaded += 1
      this.$el.style.width = `${(this._loaded / this._started) * 100}%`
      if (this._loaded >= this._started) {
        this.cleanUp()
      }
    }
    cleanUp() {
      console.info(`All data loaded in ${Date.now() - this.startTime}ms`)
      setTimeout(() => {
        this.$root.classList.add('fadeout')
      }, 500)
      setTimeout(() => {
        document.body.removeChild(this.$root)
      }, 1200)
    }
  }

  window.__loader = new Loader(
    document.querySelector('#shell .loading'),
    document.getElementById('shell')
  )

  window.setTimeout(function () {
    [
      'https://fonts.googleapis.com/css?family=Open+Sans',
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    ]
      .map(href => {
        const link = document.createElement('link')
        link.href = href
        link.setAttribute('rel', 'stylesheet')
        return link
      }).map(el => {
        document.head.appendChild(el)
      })
  })
})()
