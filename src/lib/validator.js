import Ajv from 'ajv'

export const createAjv = options => new Ajv({
  schemaId: 'auto',
  removeAdditional: true, // PREVENT UNMATCHED SCHEMA ERROR
  useDefaults: true,
  ...options || {},
})
