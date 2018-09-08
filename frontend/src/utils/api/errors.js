export default class APIError extends Error {
  constructor(message, code = 500) {
    super(message)
    this.code = code
    this.name = 'APIError'
    console.warn(this)
  }
}
