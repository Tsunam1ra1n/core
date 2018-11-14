![PHANTOM Core](https://i.imgur.com/dPHOKrL.jpg))

# PHANTOM Core - Winston Logger

## Installation

```bash
yarn add @phantomchain/core-logger-winston
```

## Configuration

```js
module.exports = {
  transports: {
    console: {
      constructor: 'Console',
      options: {
        level: process.env.PHANTOM_LOG_LEVEL || 'debug',
        format: require('./formatter'),
      },
    },
    dailyRotate: {
      package: 'winston-daily-rotate-file',
      constructor: 'DailyRotateFile',
      options: {
        level: process.env.PHANTOM_LOG_LEVEL || 'debug',
        filename:
          process.env.PHANTOM_LOG_FILE ||
          `${process.env.PHANTOM_PATH_DATA}/logs/core/${
            process.env.PHANTOM_NETWORK_NAME
          }/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '100m',
        maxFiles: '10',
      },
    },
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
