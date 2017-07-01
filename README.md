# cholobot
Telegram bot to handle Thursday's lunch rules

## Getting started
- Clone the repository
- Generate a Telegram bot token using botfather to test locally
- Replace bot token in config variables `config/development.json`
- `npm run start:dev`

## Heroku deployment
`git push heroku master`
Make sure you upload the right token in `config/default.json`

## Finding bot in Telegram
`t.me/chol0bot`

## Babel config
Project is using babel to write ES6 code, take a look `start` script in `package.json`
