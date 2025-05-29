const { Telegraf } = require("telegraf");
const handleImageRequest = require("../utils/handleImageRequest");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Bot commands
bot.start((ctx) =>
  ctx.reply("Welcome to the image generator bot!\nSend me a prompt and I'll generate an image.")
);
bot.help((ctx) => ctx.reply("I can help you generate images!"));
bot.on("text", handleImageRequest);

// Vercel handler
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body);
    } catch (err) {
      console.error("Telegram error:", err);
    }
    return res.status(200).send("ok");
  }

  res.status(200).send("Bot running (Webhook endpoint)");
};
