import createApp from '../src/loaders/app.js';

export default function createTestServer() {
  return createApp({ port: Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000, logger: false, disabledPlugins: ['Swagger', 'SwaggerUI'] });
}
