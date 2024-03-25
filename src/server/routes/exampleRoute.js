import { getExamples, getExample } from '../schemas/example.js';

export default [
  {
    method: 'GET',
    url: '/examples',
    schema: {
      getExamples,
    },
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
