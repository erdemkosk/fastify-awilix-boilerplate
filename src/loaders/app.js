/* eslint-disable no-restricted-syntax */
import fastify from 'fastify';
import container from './container.js';
import { plugins } from './plugin.js';

export default function createApp({ port, logger, disabledPlugins = [] }) {
  const app = fastify({
    logger,
  });

  const activePlugins = plugins.filter(({ name }) => !disabledPlugins.includes(name));

  for (const { plugin, options, name } of activePlugins) {
    try {
      app.register(plugin, options);
      app.log.info(`${name} plugin registered with success!`);
    } catch (error) {
      app.log.info(`${name} plugin cannot registered:`, error);
    }
  }

  for (const route of container.routes) {
    try {
      app.route(route);
    } catch (error) {
      app.log.error(`Error loading route: ${error.message}`);
    }
  }

  app.listen(port, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`Server is running on port ${port}`);
  });

  return app;
}
