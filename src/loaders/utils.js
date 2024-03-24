import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function transformModuleName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const transformRouteHandler = (container) => (route) => {
  const [controllerName, methodName] = route.handler.split('.');
  const scoped = container.createScope();
  const controller = scoped.resolve(controllerName);
  const routeHandler = controller[methodName].bind(controller);

  return {
    ...route,
    handler: async (req, res) => routeHandler(req, res),
  };
};

export { transformRouteHandler, transformModuleName, __dirname };
