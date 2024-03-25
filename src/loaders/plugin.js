import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import { fastifyAwilixPlugin } from '@fastify/awilix';

export const plugins = [
  {
    plugin: fastifyAwilixPlugin,
    name: 'Awilix',
    options: {
      disposeOnClose: true,
      disposeOnResponse: true,
      strictBooleanEnforced: true,
    },
  },
  {
    plugin: Swagger,
    name: 'Swagger',
    options: {},
  },
  {
    plugin: SwaggerUI,
    name: 'SwaggerUI',
    options: {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      staticCSP: true,
    },
  },
];
