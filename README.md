![logo](https://i.imgur.com/7JGUmOX.png)

This project is designed to provide a foundation for getting started quickly with Fastify and Awilix. Fastify is a fast and efficient web framework; Awilix is a library used for dependency injection and inversion of control.

## Features

- **Dependency Injection**: Implement dependency injection using Awilix, eliminate tight couplings between components, and make the code more testable.
- **Modular Structure**: Organize components such as services, controllers, repositories, etc., in a modular way for better maintainability.
- **Flexible Configuration**: Customize the project according to your needs with a pre-configured but flexible structure.
- **Custom Error Handling**: Easily handle errors by extending custom error classes provided in the `errors` folder. Define specific error messages, status codes, and additional data as needed.
- **Custom Plugins**: Leverage Fastify's plugin system to easily extend and customize your application's functionality. Encapsulate reusable components, middleware, and routes into custom plugins for improved modularity and maintainability.
- **Configuration Management**: Manage application settings effortlessly by editing configuration files in the `config` folder. Customize various aspects of your application based on different environments (development, production, etc.) for enhanced flexibility and adaptability.

## Getting Started

1. **Installation**: Clone the project and install dependencies by running the following command:

    ```bash
    git clone https://github.com/yourusername/fastify-awilix-boilerplate.git
    cd fastify-awilix-boilerplate
    npm install
    ```

2. **Configuration**: Customize the project according to your needs. You can configure various settings by editing the files in the `config` folder.

3. **Run**: Start the project by running the following command:

    ```bash
    npm start
    ```

4. **Development**: Start developing the project by editing files in the `src` folder. Start the development mode to automatically reload after any changes:

    ```bash
    npm run dev
    ```

## Contributing

1. Fork this project and create a local copy.
2. Create a new branch: `git checkout -b feature/feature-name`
3. Make changes: `git commit -am 'Add new feature'`
4. Push changes to the main branch: `git push origin feature/feature-name`
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
