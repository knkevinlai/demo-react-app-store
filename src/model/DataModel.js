import { createAjv } from '../lib/validator'

class DataModel {
  constructor() {
    this.ajv = createAjv()
    this._data = undefined
    this.schema = {}
  }

  validate() {
    return this.ajv.validate(this.schema, this._data)
  }

  get data() {
    return this._data
  }
}

export default DataModel
