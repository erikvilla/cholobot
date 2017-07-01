import Telegraf, { Extra, Markup } from 'telegraf';
import config from 'config';

const token = config.get('token');
const app = new Telegraf(token);

app.command('start', (ctx) => {
  ctx.reply('Welcome!')
})

app.startPolling();
