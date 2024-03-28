// eslint-disable-next-line no-unused-vars
import fastify from 'fastify';
import { jest } from '@jest/globals';
import awilix from 'awilix';
import container from '../../src/loaders/container';

import { ExampleRepository } from '../mock/repositories/index.js';
import CustomErrors from '../../src/errors/error-util';

const { ExampleNotFound } = CustomErrors;

describe('exampleService', () => {
  let exampleService;

  beforeAll(async () => {
    container.diContainer.register('ExampleRepository', awilix.asValue(ExampleRepository));
    exampleService = container.diContainer.resolve('ExampleService');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getExamples', () => {
    it('should get examples', async () => {
      const mockExamples = [
        { id: 1, name: 'Example 1' },
        { id: 2, name: 'Example 2' },
      ];

      ExampleRepository.getExamples.mockResolvedValue(
        mockExamples,
      );

      const result = await exampleService.getExamples();

      expect(result.examples).toEqual(mockExamples);
    });
  });

  describe('getExample', () => {
    it('should return an example if it exists', async () => {
      const exampleId = 1;
      const exampleData = { id: exampleId, name: 'Test Example' };

      ExampleRepository.getExample.mockResolvedValue(exampleData);

      const result = await exampleService.getExample({ id: exampleId });

      expect(ExampleRepository.getExample).toHaveBeenCalledWith({ id: exampleId });
      expect(result.example).toEqual(exampleData);
    });

    it('should throw ExampleNotFound if the example does not exist', async () => {
      const exampleId = 2;

      ExampleRepository.getExample.mockResolvedValue(undefined);

      await expect(exampleService.getExample({ id: exampleId }))
        .rejects.toThrow(ExampleNotFound);
    });
  });
});
