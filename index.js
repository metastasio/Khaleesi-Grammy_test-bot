require('dotenv').config();

const express = require('express');
const { Bot, GrammyError, HttpError } = require('grammy');
const { khaleesify } = require('./utils/khaleesify.js');

const app = express();
const bot = new Bot(process.env.BOT_API_KEY);
const port = process.env.PORT || 8080;

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

bot.hears(
  [/огон/i, /гори/i, /пепел/i, /пепл/i, /дракарис/i, /горят/i, /горяч/i],
  async (ctx) => {
    await ctx.react('🔥');
  },
);

bot.on(':text', async (ctx) => {
  const text = ctx.message.text ?? '';

  if (
    !ctx.message.reply_to_message ||
    !/кхалиси|@KhaleesiTestGrammy_bot/i.test(text)
  )
    return;

  const quotedText = ctx.update.message.reply_to_message.text;

  await ctx.reply(`${khaleesify(quotedText)}`);
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling an update: ${ctx.update.update_id}`);

  const e = err.error;
  if (e instanceof GrammyError) {
    console.error('Request error:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not reach Telegram', e);
  } else {
    console.error('Unknown error', e);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

bot.start();
