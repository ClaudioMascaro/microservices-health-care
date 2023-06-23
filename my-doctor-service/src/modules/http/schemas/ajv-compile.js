import Ajv from 'ajv'

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
})

require('ajv-errors')(ajv, {
  singleError: false,
})

export function schema(schema) { return ajv.compile(schema) }
