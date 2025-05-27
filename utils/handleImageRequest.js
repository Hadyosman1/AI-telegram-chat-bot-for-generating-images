const generateImage = require("./generateImage");
const getImageGenerationStatus = require("./getImageGenerationStatus");

module.exports = async (ctx) => {
  const waitingMessage = await ctx.reply(
    "⏳ Please wait while I generate the image..."
  );

  try {
    const prompt = ctx.message.text.trim();

    if (prompt.length < 5) {
      await ctx.reply(
        "❌ Please provide a longer prompt. The prompt should be at least 5 characters long."
      );
      return;
    }

    const result = await generateImage(prompt);

    if (result.generated.length > 0) {
      await ctx.replyWithPhoto(result.generated[0]);
      await ctx.deleteMessage(waitingMessage.message_id);
    } else {
      let attempts = 0;
      const maxAttempts = 10;

      const intervalId = setInterval(async () => {
        attempts++;

        const status = await getImageGenerationStatus(result.task_id);

        if (status.status === "COMPLETED") {
          clearInterval(intervalId);
          if (status.generated.length > 0) {
            await ctx.replyWithPhoto(status.generated[0]);
            await ctx.deleteMessage(waitingMessage.message_id);
          } else {
            throw new Error("Something went wrong");
          }
        }

        if (status.status === "FAILED" || attempts >= maxAttempts) {
          clearInterval(intervalId);
          await ctx.reply(
            "❌ An error occurred while generating the image. Please try again later."
          );
          await ctx.deleteMessage(waitingMessage.message_id);
        }
      }, 2000);
    }
  } catch (error) {
    console.error(error);
    await ctx.reply(
      "❌ An error occurred while generating the image. Please try again later."
    );
    await ctx.deleteMessage(waitingMessage.message_id);
  }
};
