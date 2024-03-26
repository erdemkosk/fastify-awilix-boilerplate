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

    const { id } = req.params;

    const { example } = await ExampleService.getExample({ id });

    res.send(example);
  }
}
