import assert from 'node:assert';
import awilix from 'awilix';
import {
  test, before, after, mock, beforeEach, describe,
} from 'node:test';
import createTestServer from '../../helper.js';
import CustomErrors from '../../../src/errors/error-util.js';
import { ExampleRepository } from '../../mock/repositories/index.js';

const { ExampleNotFound } = CustomErrors;

let app;
let exampleService;

describe('Example Service Unit', async () => {
  before(async () => {
    app = await createTestServer();
    await app.diContainer.register('ExampleRepository', awilix.asValue(ExampleRepository));
    exampleService = app.diContainer.resolve('ExampleService');
  });

  beforeEach(() => mock.restoreAll());

  after(async () => {
    await app.close();
  });

  test('should get examples', async () => {
    const mockExamples = [
      { id: 1, name: 'Example 1' },
      { id: 2, name: 'Example 2' },
    ];

    mock.method(ExampleRepository, 'getExamples', () => mockExamples);

    const result = await exampleService.getExamples();

    assert.deepStrictEqual(result.examples, mockExamples);
  });

  test('should return an example if it exists', async () => {
    const exampleId = 1;
    const exampleData = { id: exampleId, name: 'Test Example' };

    mock.method(ExampleRepository, 'getExample', () => exampleData);

    const result = await exampleService.getExample({ id: exampleId });

    assert.deepStrictEqual(result.example, exampleData);
  });

  test('should throw ExampleNotFound if the example does not exist', async () => {
    const exampleId = 2;

    mock.method(ExampleRepository, 'getExample', () => undefined);

    try {
      await exampleService.getExample({ id: exampleId });
      assert.fail('Expected an error to be thrown');
    } catch (error) {
      assert.ok(error instanceof ExampleNotFound);
      assert.strictEqual(error.message, 'Example not found.');
    }
  });
});
