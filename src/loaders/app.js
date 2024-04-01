/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { createContainer } from './container.js';
import { plugins } from './plugin.js';
import config from '../config/index.js';

export default async function createApp({
  port = config.server.port,
  logger,
  disabledPlugins = [],
}) {
  const { fastify, routes } = await createContainer({ logger });

  const activePlugins = plugins.filter(({ name }) => !disabledPlugins.includes(name));

  for (const { plugin, options, name } of activePlugins) {
    try {
      await fastify.register(plugin, options);
      fastify.log.info(`${name} plugin registered with success!`);
    } catch (error) {
      fastify.log.info(`${name} plugin cannot registered:`, error);
    }
  }

  for (const route of routes) {
    try {
      await fastify.route(route);
    } catch (error) {
      app.log.error(`Error loading route: ${error.message}`);
    }
  }

  try {
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  return fastify;
}
