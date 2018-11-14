![PHANTOM Core](https://i.imgur.com/dPHOKrL.jpg))

# PHANTOM Core - Webhooks

## Installation

```bash
yarn add @phantomchain/core-webhooks
```

## Configuration

```js
module.exports = {
  enabled: !process.env.PHANTOM_WEBHOOKS_DISABLED,
  database: {
    dialect: 'sqlite',
    storage: `${process.env.PHANTOM_PATH_DATA}/database/webhooks.sqlite`,
    logging: process.env.PHANTOM_DB_LOGGING,
  },
  server: {
    enabled: process.env.PHANTOM_WEBHOOKS_API_ENABLED,
    host: process.env.PHANTOM_WEBHOOKS_HOST || '0.0.0.0',
    port: process.env.PHANTOM_WEBHOOKS_PORT || 4004,
    whitelist: ['127.0.0.1', '::ffff:127.0.0.1'],
    pagination: {
      limit: 100,
      include: ['/api/webhooks'],
    },
  },
}
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@phantom.org. All security vulnerabilities will be promptly addressed.

## Credits

- [Brian Faust](https://github.com/faustbrian)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
