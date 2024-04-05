/* eslint-disable no-unused-vars */
export default class ExampleController {
  constructor({ ExampleService }) {
    this.ExampleService = ExampleService;
  }

  async getExamples(req, res) {
    const { ExampleService } = this;

    const { examples } = await ExampleService.getExamples();

    return examples;
  }

  async getExample(req, res) {
    const { ExampleService } = this;

    const { id } = req.params;

    const { example } = await ExampleService.getExample({ id });

    return example;
  }

  async getDummyJson(req, res) {
    const { ExampleService } = this;

    const { values } = await ExampleService.getDummyJson();

    return values;
  }
}
