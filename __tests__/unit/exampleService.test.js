// eslint-disable-next-line no-unused-vars
import fastify from 'fastify';
import jest from 'jest-mock';
import awilix from 'awilix';
import container from '../../src/loaders/container';

import { ExampleRepository } from '../mock/repositories/index.js';

describe('exampleService', () => {
  let exampleService;

  beforeAll(async () => {
    container.diContainer.register('ExampleRepository', awilix.asValue(ExampleRepository));
    exampleService = container.diContainer.resolve('ExampleService');
  });

  afterEach(() => {

  });

  afterAll(async () => {
    // await stop();
  });

  it('should get examples', async () => {
    const mockExamples = [
      { id: 1, name: 'Example 1' },
      { id: 2, name: 'Example 2' },
    ];

    ExampleRepository.getExamples = jest.fn().mockResolvedValueOnce(
      mockExamples,
    );

    const result = await exampleService.getExamples();

    expect(result.examples).toEqual(mockExamples);
  });
});
