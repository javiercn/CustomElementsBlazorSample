const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7193';

const PROXY_CONFIG = [
  {
    "context": [
      "/_framework/blazor.server.js",
    ],
    "target": target,
    "secure": false,
    "changeOrigin": true,
  },
  {
    context: [
      "/_content",
      "/_framework",
      "/_blazor",
    ],
    proxyTimeout: 3000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  {
    context: [
      "/_blazor"
    ],
    target: target,
    secure: false,
    ws: true,
  }
];

module.exports = PROXY_CONFIG;
