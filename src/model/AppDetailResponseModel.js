import DataModel from './DataModel'
import AppDetailModel from './AppDetailModel'

const sourceSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    resultCount: { type: 'integer' },
    results: {
      type: 'array',
      items: AppDetailModel.schema,
    },
  },
  additionalProperties: true,
}

class AppDetailResponseModel extends DataModel {
  static schema = sourceSchema

  static of = data => {
    const instance = new AppDetailResponseModel()
    instance._data = data
    return instance
  }

  constructor(payload) {
    super(payload)
    this.schema = sourceSchema
  }
}

export default AppDetailResponseModel
