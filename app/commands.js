import axios from 'axios';
import config from 'config';
import httpStatus from 'http-status-codes';
import cache from './database/cache';
import staticResponses from './data/staticResponses';

import {
  removeCurrent,
  findCurrentMorto,
  setCurrent,
  getMortos,
} from './database/actions';

const giphyUrl = process.env.giphy_url || config.get('giphy_url');
const giphyToken = process.env.giphy_token || config.get('giphy_token');
const GIPHY_API_LIMIT = 25;

const getRandomNum = limit => Math.floor(Math.random() * limit);

const getSearchGiphyURL = queryString =>
  `${giphyUrl}search?api_key=${giphyToken}&q=${encodeURIComponent(queryString)}&limit=${GIPHY_API_LIMIT}`;

const promiseReply = (queryString, ctx) => {
  const random = getRandomNum(GIPHY_API_LIMIT);
  const url = getSearchGiphyURL(queryString);
  axios.get(url)
    .then((response) => {
      if (response.status === httpStatus.OK) {
        ctx.reply(response.data.data[random].url);
      }
    })
    .catch((error) => {
      ctx.reply('error: ', JSON.stringify(error, null, 2));
    });
};

export const rules = (ctx) => {
  let i = 0;
  let result = '';
  cache.getValue('allRules').forEach((rule) => {
    result += `${i += 1}.- ${rule} \n`;
  });
  ctx.reply(result);
};

export const mortos = (ctx) => {
  const people = cache.getValue('people');
  const nameArray = people.map(person => (person.current ? `*${person.name}*` : person.name));
  const peopleString = nameArray.join('\n');
  ctx.reply(peopleString);
};

export const qtvv = (ctx) => {
  ctx.reply(staticResponses.qtvv);
};

export const buenas = (ctx) => {
  const index = getRandomNum(staticResponses.buenas.length);
  ctx.reply(staticResponses.buenas[index]);
};

const getNextName = (index) => {
  let name = '';
  const people = cache.getValue('people');
  const lastIndex = people.length - 1;
  if (index === 0) {
    name = people[lastIndex].name;
  } else {
    name = people[index - 1].name;
  }

  return name;
};

export const next = (ctx) => {
  const people = cache.getValue('people');
  findCurrentMorto().then((morto) => {
    removeCurrent(morto.name);
    return morto.name;
  }).then((mortoName) => {
    const index =
      people.findIndex(morto => morto.name === mortoName);
    return index;
  }).then((index) => {
    const name = getNextName(index);
    ctx.reply(`${name} is next`);
    return setCurrent(name);
  })
  .then(() => getMortos())
  .then((result) => {
    cache.setValue('people', result);
  });
};

export const jaja = (ctx) => {
  ctx.reply(staticResponses.jaja);
};

export const chupala = (ctx) => {
  const index = getRandomNum(staticResponses.chupala.length);
  ctx.reply(staticResponses.chupala[index]);
};

export const vv = (ctx) => {
  ctx.reply(staticResponses.vv);
};

export const hpvv = (ctx) => {
  ctx.reply(staticResponses.hpvv);
};

/* GIPHY responses */

export const fuck = (ctx) => {
  const queryString = 'what the fuck';
  return promiseReply(queryString, ctx);
};

export const zerofucks = (ctx) => {
  const queryString = 'zero fucks';
  return promiseReply(queryString, ctx);
};

export const fucku = (ctx) => {
  const queryString = 'fuck you';
  return promiseReply(queryString, ctx);
};
