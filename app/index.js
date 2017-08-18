import Telegraf, { Extra, Markup } from 'telegraf';
import config from 'config';
import bot from './bot.js';
import {
  getRules,
  getMortos,
} from './database/actions.js';
import cache from './database/cache.js';

/** telegram app **/
const token = process.env.token || config.get('token');
const URL = process.env.URL || config.get('URL');
const PORT = process.env.PORT || 5000;
const isDevelopment = process.env.NODE_ENV === 'development';

const app = new Telegraf(token);

/** static data **/
getRules().then((result) => {
  cache.setValue('allRules', result.map(rule => rule.rule));
  /** creating bot instance **/
  bot(app);
}).then(
  getMortos().then((result) => {
    cache.setValue('people', result);
  })
);

if(isDevelopment) {
  app.startPolling();
}else {
  app.telegram.setWebhook(`${URL}/bot${token}`);
  app.startWebhook(`/bot${token}`, null, PORT);
}
