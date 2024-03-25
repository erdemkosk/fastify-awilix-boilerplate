import Fastify from 'fastify';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import container from './container.js';

export default class App {
  constructor({
    port, preRoutesMiddlewares, postRoutesMiddlewares,
  }) {
    this.fastify = Fastify({
      logger: true,
    });

    this.port = port;
    this.preRoutesMiddlewares = preRoutesMiddlewares;
    this.postRoutesMiddlewares = postRoutesMiddlewares;

    this.loadModules();
    this.loadMiddlewares({ middlewares: preRoutesMiddlewares });
    this.loadRoutes({ routes: container.routes });
    this.loadMiddlewares({ middlewares: postRoutesMiddlewares });
  }

  loadModules() {
    const { fastify } = this;

    fastify.register(fastifyAwilixPlugin, {
      disposeOnClose: true,
      disposeOnResponse: true,
      strictBooleanEnforced: true,
    });
  }

  loadMiddlewares({ middlewares }) {
    const { fastify } = this;

    middlewares.forEach((middleware) => {
      fastify.use(middleware);
    });
  }

  loadRoutes({ routes }) {
    const { fastify } = this;

    routes.forEach((route) => {
      fastify.route(route);
    });
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
