# Phantom Core - PostgreSQL Database Provider

<p align="center">
    <img src="../../banner.png?sanitize=true" />
</p>

## Installation

```bash
yarn add @phantomchain/core-database-postgres
```

## Configuration

```js
module.exports = {
  initialization: {
    capSQL: true,
    promiseLib: require('bluebird'),
    noLocking: process.env.NODE_ENV === 'test',
  },
  connection: {
    host: process.env.PHANTOM_DB_HOST || 'localhost',
    port: process.env.PHANTOM_DB_PORT || 5432,
    database:
      process.env.PHANTOM_DB_DATABASE ||
      `phantom_${process.env.PHANTOM_NETWORK_NAME}`,
    user: process.env.PHANTOM_DB_USERNAME || 'phantom',
    password: process.env.PHANTOM_DB_PASSWORD || 'password',
  },
}
```

If you want to see all available configuration properties head over to https://github.com/vitaly-t/pg-promise.

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@ark.io. All security vulnerabilities will be promptly addressed.

## Credits

- [Brian Faust](https://github.com/faustbrian)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
