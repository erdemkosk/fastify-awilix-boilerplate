export default class ExampleController {
  constructor({ ExampleService }) {
    this.ExampleService = ExampleService;
  }

  async getExamples(req, res) {
    const { ExampleService } = this;

    const { examples } = await ExampleService.getExamples();
    res.send(examples);
  }

  async getExample(req, res) {
    const { ExampleService } = this;

    const { example } = await ExampleService.getExample();
    res.send(example);
  }
}
