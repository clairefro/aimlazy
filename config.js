/** Config */
require("dotenv").config({ path: __dirname + "/.env" });

const config = {
  openAiApiKey: process.env.OPENAI_API_KEY,
};

/** Check for required env vars, exit script if missing */
const checkEnvVars = () => {
  const required = ["OPENAI_API_KEY"];
  const missing = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });
  if (missing.length) {
    console.error(`Missing the following config: ${missing.join(", ")}`);
    process.exit(1);
  }
};

module.exports = { config, checkEnvVars };
