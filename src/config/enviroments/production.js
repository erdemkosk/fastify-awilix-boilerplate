const server = {
  port: process.env.PORT || 4000,
};

export default {
  env: 'production',
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  server,
};
