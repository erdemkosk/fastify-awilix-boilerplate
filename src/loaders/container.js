import awilix, { asClass, asFunction } from 'awilix';

import {
  diContainer,
} from '@fastify/awilix';

import { transformModuleName, transformRouteHandler, __dirname } from './utils.js';

import config from '../config/index.js';

await diContainer.register({
  config: asFunction(() => config).singleton(),
}, {
  resolverOptions: {
    esModules: true,
  },
});

await diContainer.loadModules(['../server/repositories/*.js'], {
  cwd: __dirname,
  formatName: transformModuleName,
  resolverOptions: { register: asClass },
  esModules: true,
});

await diContainer.loadModules(['../server/services/*.js'], {
  cwd: __dirname,
  formatName: transformModuleName,
  resolverOptions: { register: asClass },
  esModules: true,
});

await diContainer.loadModules(['../server/controllers/*.js'], {
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

export default { diContainer, routes };
