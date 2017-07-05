import cache from './database/cache.js';
import staticResponses from './data/staticResponses.js';

export default (app) => {
  app.command('start', (ctx) => {
    ctx.reply('Welcome!')
  });

  app.command('rules', (ctx) => {
    const rules = cache.getValue('rules');
    const ruleString = rules.join('\n');
    ctx.reply(ruleString)
  });

  app.command('mortos', (ctx) => {
    const people = cache.getValue('people');
    const nameArray = people.map(person => person.current ? `*${person.name}*` : person.name);
    const peopleString = nameArray.join('\n');
    ctx.reply(peopleString)
  });

  app.command('qtvv', (ctx) => {
    ctx.reply(staticResponses['qtvv']);
  });

  app.command('buenas', (ctx) => {
    const index = Math.floor((Math.random() * staticResponses.buenas.length-1) + 1);
    ctx.reply(staticResponses.buenas[index]);
  });

  app.command('next', (ctx) => {
    const name = getNextName(people);
    setCurrent();
  });
  
  app.command('jaja', (ctx) => {
    ctx.reply(staticResponses['jaja']);
  });
  
  app.command('chupala', (ctx) => {
    ctx.reply(staticResponses['chupala']);
  });
}
