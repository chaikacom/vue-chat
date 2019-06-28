export default class Model {
  defaults () {
    return {}
  }

  merge (options) {
    Object.assign(this, this.defaults(), options)
  }

  constructor (options = {}) {
    this.merge(options)
    this.init()
  }

  init () {}
}
