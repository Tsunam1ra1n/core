![PHANTOM Core](https://i.imgur.com/dPHOKrL.jpg))

# PHANTOM Core - JSON-RPC Server

## Installation

```bash
yarn add @phantomchain/core-json-rpc
```

## Configuration

```js
module.exports = {
  enabled: process.env.PHANTOM_JSON_RPC_ENABLED,
  host: process.env.PHANTOM_JSON_RPC_HOST || '0.0.0.0',
  port: process.env.PHANTOM_JSON_RPC_PORT || 8080,
  allowRemote: false,
  whitelist: ['127.0.0.1', '::ffff:127.0.0.1'],
  database: {
    uri:
      process.env.PHANTOM_JSON_RPC_DATABASE ||
      `sqlite://${process.env.PHANTOM_PATH_DATA}/database/json-rpc.sqlite`,
    options: {},
  },
}
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@phantom.org. All security vulnerabilities will be promptly addressed.

## Credits

- [François-Xavier Thoorens](https://github.com/fix)
- [Brian Faust](https://github.com/faustbrian)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
