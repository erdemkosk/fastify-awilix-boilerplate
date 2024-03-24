export default class ExampleService {
  constructor({ ExampleRepository }) {
    this.ExampleRepository = ExampleRepository;
  }

  async getExamples() {
    const { ExampleRepository } = this;

    const examples = await ExampleRepository.getExamples();

    return {
      examples,
    };
  }
}
