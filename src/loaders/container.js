import awilix, { asClass, asFunction } from 'awilix';
import Fastify from 'fastify';

import {
  diContainer,
} from '@fastify/awilix';

import { transformModuleName, transformRouteHandler, __dirname } from './utils.js';

import config from '../config/index.js';

const fastify = Fastify({
  logger: true,
  level: config.log.level,
});

await diContainer.register({
  fastify: asFunction(() => fastify).singleton(),
  config: asFunction(() => config).singleton(),
  logger: asFunction(() => fastify.log).singleton(),
}, {
  resolverOptions: {
    esModules: true,
  },
});

const modules = [['../server/repositories/*.js'], ['../server/services/*.js'], ['../server/controllers/*.js']];

await diContainer.loadModules(modules, {
  cwd: __dirname,
  formatName: transformModuleName,
  resolverOptions: { register: asClass },
  esModules: true,
});

const routeTransformer = transformRouteHandler(diContainer);

const routes = await awilix.listModules(['../server/routes/*.js'], { cwd: __dirname, esModules: true })
  .map(({ path }) => path)
  .map(async (path) => {
    const module = await import(path);
    return module.default;
  })
  .reduce(async (acc, rawRoutes) => {
    const route = await acc;
    const moduleRoutes = await rawRoutes;
    return route.concat(moduleRoutes.map(routeTransformer));
  }, []);

export default { fastify, routes, diContainer };
