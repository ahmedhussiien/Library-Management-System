import 'dotenv/config';

const Config = {
  PORT: 3000,
  NODE_ENV: 'prod',
};

function setConfigVariablesFromEnv(Config) {
  for (const key in Config) {
    if (key in process.env) Config[key] = process.env[key];
  }
}

setConfigVariablesFromEnv(Config);

export default Config;
