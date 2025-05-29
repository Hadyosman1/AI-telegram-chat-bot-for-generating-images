  require("dotenv").config();

  const { Telegraf } = require("telegraf");

  const handleImageRequest = require("./utils/handleImageRequest");

  const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  bot.start((ctx) =>
    ctx.reply(
      "Welcome to the image generator bot!\nSend me a prompt and I'll generate an image for you."
    )
  );

  bot.help((ctx) => ctx.reply("I can help you generate images!"));
  
  bot.on("text", handleImageRequest);

  bot.launch(() => console.log("Bot started"));
