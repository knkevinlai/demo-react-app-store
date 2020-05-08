import DataModel from './DataModel'

const sourceSchema = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    screenshotUrls: { type: 'array' },
    ipadScreenshotUrls: { type: 'array' },
    appletvScreenshotUrls: { type: 'array' },
    artworkUrl60: { type: 'string' },
    artworkUrl512: { type: 'string' },
    artworkUrl100: { type: 'string' },
    artistViewUrl: { type: 'string' },
    supportedDevices: { type: 'array' },
    advisories: { type: 'array' },
    isGameCenterEnabled: { type: 'boolean' },
    kind: { type: 'string' },
    features: { type: 'array' },
    trackCensoredName: { type: 'string' },
    languageCodesISO2A: { type: 'array' },
    fileSizeBytes: { type: 'string' },
    sellerUrl: { type: 'string' },
    contentAdvisoryRating: { type: 'string' },
    averageUserRatingForCurrentVersion: { type: 'number' },
    userRatingCountForCurrentVersion: { type: 'number' },
    averageUserRating: { type: 'number' },
    trackViewUrl: { type: 'string' },
    trackContentRating: { type: 'string' },
    trackId: { type: 'number' },
    trackName: { type: 'string' },
    currentVersionReleaseDate: { type: 'string' },
    releaseNotes: { type: 'string' },
    releaseDate: { type: 'string' },
    genreIds: { type: 'array' },
    formattedPrice: { type: 'string' },
    primaryGenreName: { type: 'string' },
    isVppDeviceBasedLicensingEnabled: { type: 'boolean' },
    minimumOsVersion: { type: 'string' },
    sellerName: { type: 'string' },
    primaryGenreId: { type: 'number' },
    currency: { type: 'string' },
    version: { type: 'string' },
    wrapperType: { type: 'string' },
    artistId: { type: 'number' },
    artistName: { type: 'string' },
    genres: { type: 'array' },
    price: { type: 'number' },
    description: { type: 'string' },
    bundleId: { type: 'string' },
    userRatingCount: { type: 'number' },
  },
  additionalProperties: true,
}

class AppDetailModel extends DataModel {
  static schema = sourceSchema

  constructor(payload) {
    super(payload)
    this.schema = sourceSchema
  }
}

export default AppDetailModel
