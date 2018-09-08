export default class APIError extends Error {
  constructor(message, code) {
    if (!code) {
      super(`API Server Error 500: ${message}`)
    } else {
      super(`API Error ${code}: ${message}`)
    }
    this.name = 'APIError'
    console.warn(this)
  }
}
