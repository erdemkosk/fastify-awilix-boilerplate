import App from './src/loaders/app.js';

const preRoutesMiddlewares = [];

const postRoutesMiddlewares = [];

const app = new App({
  port: 3000,
  preRoutesMiddlewares,
  postRoutesMiddlewares,
});

app.listen();
