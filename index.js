import createApp from './src/loaders/app.js';

const app = createApp({ port: 3000, logger: true });

app.listen();
