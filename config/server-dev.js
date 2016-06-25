const config = {
  schema: 'http',
  host: 'localhost',
  port: 8080,
  apiVersion: 'v1',
  loginCookie: 'email',
  tokenCookie: 'access_token',
  tokenHeader: 'Authorization',
};

config.url = `${config.schema}://${config.host}:${config.port}`;

export default config;
