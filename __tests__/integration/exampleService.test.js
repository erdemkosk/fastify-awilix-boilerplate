import {
  test, before, after, mock, beforeEach, describe,
} from 'node:test';
import assert from 'node:assert';
import createTestServer from '../helper.js';

let app;

describe('Example Service integration Test', async () => {
  before(async () => {
    app = await createTestServer();
    await app.listen();
  });

  after(async () => {
    await app.close();
  });

  test('GET /examples - should return all examples', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/examples',
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(JSON.stringify(JSON.parse(response.body)), JSON.stringify([
      { id: 1, name: 'Example 1' },
      { id: 2, name: 'Example 2' },
      { id: 3, name: 'Example 3' },
    ]));
  });

  test('GET /examples/:id - should return a single example by id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/examples/1',
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(JSON.stringify(JSON.parse(response.body)), JSON.stringify({ id: 1, name: 'Example 1' }));
  });

  test('GET /examples/:id - should return 404 if example not found', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/examples/999',
    });

    assert.strictEqual(response.statusCode, 404);
    await app.close();
  });
});
