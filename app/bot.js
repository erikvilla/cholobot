import cache from './database/cache';
import * as commands from './commands';

export default (app) => {
  // Adding commands to bot
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
  for (const cmdName in commands) {
    if (cmdName) {
      const cmd = commands[cmdName];
      app.command(cmdName, (ctx) => {
        cmd(ctx);
      });
    }
  }
};
