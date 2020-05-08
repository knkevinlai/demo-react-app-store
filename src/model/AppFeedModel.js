import DataModel from './DataModel'

const sourceSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    artistName: { type: 'string' },
    id: { type: 'string' },
    releaseDate: { type: 'string' },
    name: { type: 'string' },
    kind: { type: 'string' },
    copyright: { type: 'string' },
    artistId: { type: 'string' },
    artistUrl: { type: 'string' },
    artworkUrl100: { type: 'string' },
    genres: { type: 'array' },
    url: { type: 'string' },
  },
  additionalProperties: true,
}

class AppFeedModel extends DataModel {
  static schema = sourceSchema

  constructor(payload) {
    super(payload)
    this.schema = sourceSchema
  }
}

export default AppFeedModel
