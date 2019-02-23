export default class APIError extends Error {
  constructor(message, code = 1000, status = 500) {
    super(message)
    this.code = code
    this.name = 'APIError'
    this.status = status
  }
}
