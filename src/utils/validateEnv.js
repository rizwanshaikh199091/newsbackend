const { cleanEnv, str, port } = require('envalid');

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    PORT: port({ default: 3000 }),
    MONGO_URI: str(),
    JWT_SECRET: str(),
    NEWS_API_KEY: str(),
    GUARDIAN_API_KEY: str(),
    NYT_API_KEY: str(),
  });
};

module.exports = { validateEnv };
