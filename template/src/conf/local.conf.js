const port = 3578;

module.exports = {
  port: port,
  voltranEnv: 'local',
  api: {
    clientUrl: `http://localhost:${port}`,
    serverUrl: `http://localhost:${port}`
  },
  baseUrl: `http://localhost:${port}`,
  mediaUrl: '',
  logLevel: 'info',
  isCssClassNameObfuscationEnabled: false,
  sfBaseUrl: `http://localhost:${port}`,
  services: {
    'piramiteapi': {
      'clientUrl': 'http://piramite-api.qa.getir.com',
      'serverUrl': 'http://piramite-api.qa.getir.com'
    }
  },
  timeouts: {
    clientApiManager: 20 * 1000,
    serverApiManager: 20 * 1000
  }
};
