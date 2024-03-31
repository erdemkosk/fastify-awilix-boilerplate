import { mock } from 'node:test';

const ExampleRepository = {
  getExamples: mock.fn(),
  getExample: mock.fn(),
};

export default ExampleRepository;
