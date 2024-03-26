export default class ExampleService {
  constructor({
    fastify, config, logger, ExampleRepository,
  }) {
    this.fastify = fastify;
    this.config = config;
    this.logger = logger;

    this.ExampleRepository = ExampleRepository;
  }

  async getExamples() {
    const { ExampleRepository } = this;

    const examples = await ExampleRepository.getExamples();

    return {
      examples,
    };
  }

  async getExample() {
    const {
      fastify, config, logger, ExampleRepository,
    } = this;

    logger.info(JSON.stringify(config));

    logger.info(fastify);

    const example = await ExampleRepository.getExample();

    return {
      example,
    };
  }
}
