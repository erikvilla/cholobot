import cache from './database/cache';
import * as commands from './commands';

export default (app) => {
  app.command('start', (ctx) => {
    ctx.reply('Welcome!');
  });

  const rules = cache.getValue('allRules');
  for (let i = 0; i < rules.length; i += 1) {
    app.command(`rule${i + 1}`, (ctx) => {
      ctx.reply(rules[i]);
    });
  }

  // Adding all commands to bot
  Object.keys(commands).forEach((key) => {
    if (key) {
      const cmd = commands[key];
      app.command(key, (ctx) => {
        cmd(ctx);
      });
    }
  });
};
