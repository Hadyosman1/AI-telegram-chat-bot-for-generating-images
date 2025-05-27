const { default: axios } = require("axios");

const API_URL = "https://api.freepik.com/v1/ai/text-to-image/imagen3";
module.exports = async function getImageGenerationStatus(taskId) {
  try {
    const res = await axios.get(`${API_URL}/${taskId}`, {
      headers: {
        "x-freepik-api-key": process.env.FREEPIK_API_KEY,
      },
    });

    return res.data.data;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to get image generation status");
  }
};
