export default (app, rules) => {

    for(let i = 0; i < rules.length; i++) {
        app.command(`rule${i+1}`, ctx => {
            ctx.reply(rules[i].rule);
        });
    }

}