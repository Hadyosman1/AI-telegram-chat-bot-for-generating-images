const { default: axios } = require("axios");

const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const API_URL = "https://api.freepik.com/v1/ai/text-to-image/imagen3";

const reqConfig = {
  body: {
    num_images: 1,
    styling: {
      effects: {
        safety_settings: "block_low_and_above",
      },
    },
  },
  headers: {
    "x-freepik-api-key": FREEPIK_API_KEY,
    "Content-Type": "application/json",
  },
};

module.exports = async function generateImage(prompt) {
  reqConfig.body.prompt = prompt;

  try {
    const res = await axios.post(API_URL, reqConfig.body, {
      headers: reqConfig.headers,
    });

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate image");
  }
};
