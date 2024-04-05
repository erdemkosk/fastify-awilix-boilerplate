export default class ExampleServiceCaller {
  constructor({
    ServiceCaller,
  }) {
    this.ServiceCaller = ServiceCaller;
  }

  async getDummyJson() {
    const { ServiceCaller } = this;

    return ServiceCaller.get('https://jsonplaceholder.typicode.com/posts');
  }
}
