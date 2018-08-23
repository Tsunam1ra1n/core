const engine = require('../engine')

module.exports = (attributes) => {
  const { error, value } = engine.validate(attributes, engine.joi.phantomAddress())

  return {
    data: value,
    errors: error ? error.details : null,
    passes: !error,
    fails: error
  }
}
