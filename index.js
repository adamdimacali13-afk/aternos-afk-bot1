const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: process.env.IP || 'GERMANJV.aternos.me',
        port: parseInt(process.env.PORT) || 21584,
        username: process.env.USERNAME || 'BotAdam99'
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} successfully joined the server!`);
        setTimeout(() => {
            bot.chat(`/login ${process.env.PASSWORD || 'BotPassword123'}`);
        }, 2000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`[Chat] ${username}: ${message}`);
    });

    bot.on('kicked', (reason) => {
        console.log(`Bot was kicked: ${reason}`);
    });

    bot.on('error', (err) => {
        console.log(`Bot encountered an error: ${err}`);
    });

    bot.on('end', () => {
        console.log('Connection lost. Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
}

createBot();
