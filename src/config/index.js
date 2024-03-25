import 'dotenv/config';
import developmentConfig from './enviroments/development.js';
import productionConfig from './enviroments/production.js';

const environment = process.env.NODE_ENV || 'development';

const environmentConfig = environment === 'production' ? productionConfig : developmentConfig;

export default environmentConfig;
