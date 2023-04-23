require("dotenv/config");
const convict = require("convict");

const definitions = {
  PORT: {
    env: "PORT",
    format: Number,
    default: 3000
  }
};

const config = convict(definitions);
config.validate({ allowed: "strict" });

module.exports = config;
