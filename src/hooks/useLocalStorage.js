const KEY = Object.freeze({
  PREFERENCE: {
    THEME_PRESET_ID: {},
  },
})

const keys = new Map()
keys.set(KEY.PREFERENCE.THEME_PRESET_ID, 'preference:theme-preset-id')

export default () => {
  return {
    localStorage: window.localStorage,
    KEY,
    keys,
  }
}
