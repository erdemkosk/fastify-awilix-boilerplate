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

  async getExample() {
    return { id: 1, name: 'Example 1' };
  }
}
