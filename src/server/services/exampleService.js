import CustomErrors from '../../errors/error-util.js';

const { ExampleNotFound } = CustomErrors;

export default class ExampleService {
  constructor({
    fastify, config, logger, ExampleRepository, ExampleServiceCaller,
  }) {
    this.fastify = fastify;
    this.config = config;
    this.logger = logger;

    this.ExampleRepository = ExampleRepository;
    this.ExampleServiceCaller = ExampleServiceCaller;
  }

  async getExamples() {
    const { ExampleRepository } = this;

    const examples = await ExampleRepository.getExamples();

    return {
      examples,
    };
  }

  async getExample({ id }) {
    const {
      ExampleRepository,
    } = this;

    const example = await ExampleRepository.getExample({ id });

    if (!example) {
      throw new ExampleNotFound();
    }

    return {
      example,
    };
  }

  async getDummyJson() {
    const { ExampleServiceCaller } = this;

    const values = await ExampleServiceCaller.getDummyJson();

    return {
      values,
    };
  }
}
