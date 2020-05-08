import DataModel from './DataModel'
import AppFeedModel from './AppFeedModel'

const sourceSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    feed: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        id: { type: 'string' },
        author: { type: 'object' },
        links: { type: 'array' },
        copyright: { type: 'string' },
        country: { type: 'string' },
        icon: { type: 'string' },
        updated: { type: 'string' },
        results: {
          type: 'array',
          items: AppFeedModel.schema,
        },
      },
      // additionalProperties: false,
    },
  },
  additionalProperties: true,
}

class AppFeedsModel extends DataModel {
  static schema = sourceSchema

  static of = data => {
    const instance = new AppFeedsModel()
    instance._data = data
    return instance
  }

  constructor(payload) {
    super(payload)
    this.schema = sourceSchema
  }
}

export default AppFeedsModel