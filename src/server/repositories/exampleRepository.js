/* eslint-disable class-methods-use-this */
export default class ExampleRepository {
  async getExamples() {
    const examples = [
      { id: 1, name: 'Example 1' },
      { id: 2, name: 'Example 2' },
      { id: 3, name: 'Example 3' },
    ];

    return examples;
  }

  async getExample({ id }) {
    return Number(id) === 1 ? { id: 1, name: 'Example 1' } : undefined;
  }
}
