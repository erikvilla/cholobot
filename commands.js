import cache from './database/cache.js';

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
    ctx.reply('Que te valga verga');
  });

  app.command('buenas', (ctx) => {
    ctx.reply('Que tranza loroña');
  });

  app.command('next', (ctx) => {
    const name = getNextName(people);
    setCurrent();
  });
}
