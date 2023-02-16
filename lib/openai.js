const axios = require("axios");
const { config } = require("../config");

const baseUrl = `https://api.openai.com/v1`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${config.openAiApiKey}`,
};

const openai = {
  completion: (prompt) => {
    const data = {
      prompt,
      n: 1,
      temperature: 0.7,
      stream: false,
      max_tokens: 200,
    };

    console.log("Prompting...");

    return axios.request({
      method: "post",
      url: `${baseUrl}/engines/text-davinci-003/completions`,
      //   url: `${baseUrl}/engines/davinci/completions`,
      headers,
      data,
    });
  },
  usage: () => {
    const today = new Date();
    const n = 30;
    const startDate = new Date(today.getTime() - n * 60 * 60 * 24 * 1000);
    const end = today.toISOString().split("T")[0];
    const start = startDate.toISOString().split("T")[0];

    console.log(
      `Checking usage data for past ${n} days (${start} - ${end})...`
    );

    return axios.request({
      method: "get",
      url: `${baseUrl}/usage?end_date=${end}&start_date=${start}`,
      headers,
    });
  },
};

module.exports = { openai };
