export default class ExampleService {
  constructor({ config, ExampleRepository }) {
    this.config = config;
    this.ExampleRepository = ExampleRepository;
  }

  async getExamples() {
    const { config, ExampleRepository } = this;

    console.log(JSON.stringify(config));

    const examples = await ExampleRepository.getExamples();

    return {
      examples,
    };
  }
}
