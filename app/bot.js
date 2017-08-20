import cache from './database/cache.js';
import * as commands from './commands.js';

export default (app) => {

  //Adding commands to bot
  app.command('start', ctx => {
    ctx.reply('Welcome!')
  });

  let rules = cache.getValue('allRules');
  for (let i = 0; i < rules.length; i++) {
    app.command(`rule${i+1}`, ctx => {
      ctx.reply(rules[i]);
    });
  }

  //Adding all commands to bot
  for (var cmdName in commands) {
    const cmd = commands[cmdName];
    app.command(cmdName, ctx => {
      cmd(ctx);
    });
  }
}