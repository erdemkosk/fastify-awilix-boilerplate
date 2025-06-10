import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import { fastifyAwilixPlugin } from '@fastify/awilix';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimitter from '@fastify/rate-limit';
import { readdirSync } from 'fs';
import { join } from 'path';
import config from '../config/index.js';

const generateTagsFromRoutes = () => {
  const routesPath = join(process.cwd(), 'src', 'server', 'routes');
  const routeFiles = readdirSync(routesPath);

  const tags = routeFiles
    .filter((file) => file.endsWith('Route.js'))
    .map((file) => {
      const tagName = file.replace('Route.js', '');
      const capitalizedTagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
      return {
        name: capitalizedTagName,
        description: `Endpoints related to ${capitalizedTagName}`,
      };
    });

  return tags;
};

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
    options: {
      swagger: {
        info: {
          title: 'fastify-awilix-boilerplate',
          description: 'fastify-awilix-boilerplate example swagger',
          version: '1.0.1',
        },
        host: `${config.server.host === '0.0.0.0' ? 'localhost' : config.server.host}:${config.server.port}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: generateTagsFromRoutes(),
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter JWT Bearer token in format: Bearer {token}',
          },
        },
      },
    },
  },
  {
    plugin: SwaggerUI,
    name: 'SwaggerUI',
    options: {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
        persistAuthorization: true,
      },
      staticCSP: false,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject) => swaggerObject,
      transformSpecificationClone: true,
    },
  },
  {
    plugin: cors,
    name: 'cors',
    options: {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'X-Request-ID',
        'X-CSRF-Token',
        'X-Request-Signature',
        'X-Request-Timestamp',
        'X-Request-Nonce',
        'Authorization',
      ],
      exposedHeaders: [
        'X-CSRF-Token',
      ],
      credentials: true,
      preflight: true,
      strictPreflight: false,
    },
  },
  {
    plugin: helmet,
    name: 'Helmet',
    options: {
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: false,
      referrerPolicy: {
        policy: ['origin', 'unsafe-url'],
      },
      xFrameOptions: {
        action: 'sameorigin',
      },
    },
  },
  {
    plugin: rateLimitter,
    name: 'Rate Limitter',
    options: {
      max: 100,
      timeWindow: '1 minute',
    },
  },
];
