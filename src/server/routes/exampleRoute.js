import { getExamples, getExample } from '../schemas/example.js';
import { logRequest } from '../../loaders/middleware.js';

const routeName = 'Example';

export default [
  {
    method: 'GET',
    url: '/',
    schema: {
      tags: [routeName],
      ...getExamples,
    },
    preHandler: [logRequest],
    handler: 'ExampleController.getExamples',
  },
  {
    method: 'GET',
    url: '/:id',
    schema: {
      tags: [routeName],
      ...getExample,
    },
    handler: 'ExampleController.getExample',
  },
  {
    method: 'GET',
    url: '/dummy',
    schema: {
      tags: [routeName],
    },
    handler: 'ExampleController.getDummyJson',
  },
];
