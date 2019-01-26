/**
 * Simple CV class using promises, loosely based on https://github.com/joeireland/condition-variable
 * Doesn't return a value or anything, purely used for waiting
 */
export default class CV {
  constructor() {
    let _resolve, _reject
    this.promise = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
    this.signal = _resolve
    this.error = _reject
  }

  wait() {
    return this.promise
  }
}
