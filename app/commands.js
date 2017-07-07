import cache from './database/cache.js';
import staticResponses from './data/staticResponses.js';
import axios from 'axios';
import config from 'config';
import httpStatus from 'http-status-codes';

const giphyUrl = process.env.giphy_url || config.get('giphy_url');
const giphyToken = process.env.giphy_token || config.get('giphy_token');
const GIPHY_API_LIMIT = 25;

export default (app) => {
  app.command('start', ctx => {
    ctx.reply('Welcome!')
  });

  app.command('rules', ctx => {
    const rules = cache.getValue('allRules');
    const ruleString = rules.join('\n');
    ctx.reply(ruleString)
  });

  
  app.command('mortos', ctx => {
    const people = cache.getValue('people');
    const nameArray = people.map(person => person.current ? `*${person.name}*` : person.name);
    const peopleString = nameArray.join('\n');
    ctx.reply(peopleString)
  });

  app.command('qtvv', ctx => {
    ctx.reply(staticResponses['qtvv']);
  });

  app.command('buenas', ctx => {
    const index = getRandomNum(staticResponses.buenas.length);
    ctx.reply(staticResponses.buenas[index]);
  });

  app.command('next', ctx => {
    const name = getNextName(people);
    setCurrent();
  });
  
  app.command('0fucks', ctx => {
    const queryString = 'zero fucks';
    return promiseReply(queryString, ctx);
  });

  app.command('fucku', ctx => {
    const queryString = 'fuck you';
    return promiseReply(queryString, ctx);
  });

  const promiseReply = (queryString, ctx) => {
    const random = getRandomNum(GIPHY_API_LIMIT);
    const url = getSearchGiphyURL(queryString);
    axios.get(url)
      .then(response => {
        if(response.status === httpStatus.OK) {
          ctx.reply(response.data.data[random].url);
        }
      })
      .catch(error => {
        console.log(error);
        ctx.reply('error');
      });
  }

  const getRandomNum = (limit) => {
    return Math.floor(Math.random() * limit);
  }

  const getSearchGiphyURL = (queryString) => {
    return `${giphyUrl}search?api_key=${giphyToken}&q=${encodeURIComponent(queryString)}&limit=${GIPHY_API_LIMIT}`;
  }

  app.command('jaja', ctx => {
    ctx.reply(staticResponses['jaja']);
  });
  
  app.command('chupala', ctx => {
    const index = getRandomNum(staticResponses.chupala.length);
    ctx.reply(staticResponses.chupala[index]);
  });

  app.command('vv', ctx => {
    ctx.reply(staticResponses['vv']);
  });
  
  app.command('hpvv', ctx => {
    ctx.reply(staticResponses['hpvv']);
  });
  
  app.command('fuck', ctx => {
    const queryString = 'what the fuck';
    return promiseReply(queryString, ctx);
  });
}
