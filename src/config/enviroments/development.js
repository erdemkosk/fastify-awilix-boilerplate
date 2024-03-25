const server = {
  port: process.env.PORT || 3000,
};

export default {
  env: 'development',
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  server,
};
