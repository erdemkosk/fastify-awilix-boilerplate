import { getExample } from '../schemas/example.js';

export default [
  {
    method: 'GET',
    url: '/examples',
    schema: {
      getExample,
    },
    handler: 'ExampleController.getExamples',
  },
];
