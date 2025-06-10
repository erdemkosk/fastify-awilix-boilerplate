import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveHandler(container, handler) {
  // If handler is already a function, return as is
  if (typeof handler === 'function') {
    return handler;
  }

  // If handler is a string in 'controller.method' format
  if (typeof handler === 'string' && handler.includes('.')) {
    const [controllerName, methodName] = handler.split('.');
    const scoped = container.createScope();
    const controller = scoped.resolve(controllerName);
    return controller[methodName].bind(controller);
  }

  throw new Error(`Invalid route handler format: ${handler}`);
}

export default async function loadRoutes(fastify) {
  const routesPath = join(__dirname, '../server/routes');
  const routeFiles = readdirSync(routesPath);

  await Promise.all(routeFiles
    .filter((file) => file.endsWith('Route.js'))
    .map(async (file) => {
      const routeName = file.replace('Route.js', '').toLowerCase();
      const { default: routes } = await import(`../server/routes/${file}`);

      await fastify.register(async (instance) => {
        routes.forEach((route) => {
          const resolvedRoute = {
            ...route,
            handler: resolveHandler(fastify.diContainer, route.handler),
          };

          // Resolve preHandler if it's a string
          if (route.preHandler && typeof route.preHandler === 'string') {
            resolvedRoute.preHandler = resolveHandler(fastify.diContainer, route.preHandler);
          }

          instance.route(resolvedRoute);
        });
      }, { prefix: `/${routeName}` });

      fastify.log.info(`Routes loaded for /${routeName}`);
    }));
}