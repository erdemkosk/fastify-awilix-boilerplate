/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fastify from 'fastify';
import container from './container.js';
import { plugins } from './plugin.js';
import config from '../config/index.js';

export default async function createApp({
  port = config.server.port,
  logger,
  disabledPlugins = [],
}) {
  const app = fastify({
    logger: {
      level: config.log.level,
      enabled: logger,
    },
  });

  const activePlugins = plugins.filter(({ name }) => !disabledPlugins.includes(name));

  for (const { plugin, options, name } of activePlugins) {
    try {
      await app.register(plugin, options);
      app.log.info(`${name} plugin registered with success!`);
    } catch (error) {
      app.log.info(`${name} plugin cannot registered:`, error);
    }
  }

  for (const route of container.routes) {
    try {
      await app.route(route);
    } catch (error) {
      app.log.error(`Error loading route: ${error.message}`);
    }
  }

  try {
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  return app;
}
