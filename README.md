# cholobot
Telegram bot to handle Thursday's lunch rules

## Getting started
- Clone the repository
- Generate a Telegram bot token using [botfather](https://telegram.me/BotFather) to test locally
- Replace bot token in config variables `config/development.json`
- `npm run start:dev`

## Heroku deployment
`git push heroku master`
Make sure you upload the right token in `config/default.json`

## Finding bot in Telegram
prod: `t.me/chol0bot`

dev: `t.me/testcholobot`

## Giphy integration

- Generate an [api key for giphy api](https://developers.giphy.com/docs/)
- add `giphy_token` and `giphy_url` in your `config/development.json`

## Babel config
Project is using babel to write ES6 code, take a look `start` script in `package.json`
Babel examples can be found [here](https://github.com/babel/example-node-server)
