![PHANTOM Core](https://i.imgur.com/dPHOKrL.jpg))

# PHANTOM Core - P2P API

## Installation

```bash
yarn add @phantomchain/core-p2p
```

## Configuration

```js
module.exports = {
  host: process.env.PHANTOM_P2P_HOST || '0.0.0.0',
  port: process.env.PHANTOM_P2P_PORT || 4002,
  remoteInterface: false,
  dns: [
    // Google
    '8.8.8.8',
    '8.8.4.4',
    // CloudFlare
    '1.1.1.1',
    '1.0.0.1',
    // OpenDNS
    '208.67.222.222',
    '208.67.220.220',
  ],
  ntp: ['pool.ntp.org', 'time.google.com'],
  whitelist: ['127.0.0.1', '::ffff:127.0.0.1'],
  // @see https://github.com/wraithgar/hapi-rate-limit
  rateLimit: {
    enabled: true,
    pathLimit: false,
    userLimit: 1000,
    ipWhitelist: ['127.0.0.1', '::ffff:127.0.0.1'],
  },
}
```

## Security

If you discover a security vulnerability within this package, please send an e-mail to security@phantom.org. All security vulnerabilities will be promptly addressed.

## Credits

- [François-Xavier Thoorens](https://github.com/fix)
- [Kristjan Košič](https://github.com/kristjank)
- [Brian Faust](https://github.com/faustbrian)
- [Alex Barnsley](https://github.com/alexbarnsley)
- [All Contributors](../../../../contributors)

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
