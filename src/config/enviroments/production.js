const server = {
  port: process.env.PORT || 4000,
  plugins: {
    rateLimitter: {
      max: process.env.RATE_LIMITTER_MAX_COUNT || 100,
    },
  },
};

export default {
  env: 'development',
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  server,
};
