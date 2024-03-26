import container from './container.js';
import { plugins } from './plugin.js';

export default class App {
  constructor({
    port,
  }) {
    this.fastify = container.fastify;
    this.port = port;

    this.loadPlugins();
    this.loadRoutes({ routes: container.routes });
  }

  async loadPlugins() {
    const { fastify } = this;

    // eslint-disable-next-line no-restricted-syntax
    for (const { plugin, options, name } of plugins) {
      try {
        fastify.register(plugin, options);
        this.fastify.log.info(`${name} plugin registered with success!`);
      } catch (error) {
        this.fastify.log.info(`${name} plugin cannot registered:`, error);
      }
    }
  }

  async loadRoutes({ routes }) {
    const { fastify } = this;

    // eslint-disable-next-line no-restricted-syntax
    for (const route of routes) {
      // eslint-disable-next-line no-await-in-loop
      await fastify.register(async (fastifyInstance) => {
        fastifyInstance.route(route);
      });
    }
  }

  async listen() {
    const { fastify, port } = this;

    try {
      await fastify.listen({ port });
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
}
