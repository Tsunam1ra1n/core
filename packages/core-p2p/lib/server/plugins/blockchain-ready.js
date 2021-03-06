const Boom = require('boom')
const app = require('@phantomchain/core-container')

/**
 * The register method used by hapi.js.
 * @param  {Hapi.Server} server
 * @param  {Object} options
 * @return {void}
 */
const register = async (server, options) => {
  server.ext({
    type: 'onRequest',
    async method(request, h) {
      if (!options.routes.includes(request.path)) {
        return h.continue
      }

      if (!app.resolvePlugin('blockchain')) {
        return Boom.serverUnavailable('Blockchain not ready')
      }

      return h.continue
    },
  })
}

/**
 * The struct used by hapi.js.
 * @type {Object}
 */
exports.plugin = {
  name: 'blockchain-ready',
  version: '0.1.0',
  register,
}
