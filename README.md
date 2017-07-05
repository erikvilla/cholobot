# cholobot
Telegram bot to handle Thursday's lunch rules

## Getting started

- Clone the repository.
- Ask for the test bot token and add it to your `default.json` config file.
- Ask for db_url value to connect to mongo cloud and add it to your `default.json` config file.
- `npm install`
- `npm run start:dev`
- Now you can talk to the test instance and add new features

## Heroku deployment
Work in a branch and create a PR, once your PR is approved Heroku will automatically deploy `development` branch content

## Finding bot in Telegram

`t.me/chol0bot` | Production

`t.me/testcholobot` | Development

## Giphy integration

- Generate an [api key for giphy api](https://developers.giphy.com/docs/)
- add `giphy_token` and `giphy_url` in your `config/development.json`

## Babel config
Project is using babel to write ES6 code, take a look `start` script in `package.json`
Babel examples can be found [here](https://github.com/babel/example-node-server)
