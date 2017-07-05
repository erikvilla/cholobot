import Telegraf, { Extra, Markup } from 'telegraf';
import config from 'config';
import mongoose from 'mongoose';
import Rule from './model/rule.js';
import commands from './commands';
import {
  getRules,
  getMortos,
  setCurrent
} from './database/actions.js';
import cache from './database/cache.js';

/** static data **/
getRules().then((result) => {
  cache.setValue('rules', result.map(rule => rule.rule));
}).then(
  getMortos().then((result) => {
    cache.setValue('people', result);
  })
);

/** telegram app **/
const token = process.env.token || config.get('token');
const URL = process.env.URL || config.get('URL');
const PORT = process.env.PORT || 5000;
const isDevelopment = process.env.NODE_ENV === 'development';

const app = new Telegraf(token);
/** commands **/
commands(app);

if(isDevelopment) {
  app.startPolling();
}else {
  app.telegram.setWebhook(`${URL}/bot${token}`);
  app.startWebhook(`/bot${token}`, null, PORT);
}

