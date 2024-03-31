import { getExamples, getExample } from '../schemas/example.js';
import { logRequest } from '../../loaders/middleware.js';

export default [
  {
    method: 'GET',
    url: '/examples',
    schema: {
      getExamples,
    },
    preHandler: [logRequest],
    handler: 'ExampleController.getExamples',
  },
  {
    method: 'GET',
    url: '/examples/:id',
    schema: {
      getExample,
    },
    handler: 'ExampleController.getExample',
  },
];
