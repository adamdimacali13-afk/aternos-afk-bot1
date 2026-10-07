const mineflayer = require('mineflayer');

function createBot() {
    console.log("Attempting to connect to the Minecraft server...");
    
    const bot = mineflayer.createBot({
        host: 'GERMANJV.aternos.me',
        port: 21584,
        username: 'BotAdam99',
        checkTimeoutInterval: 60 * 1000 // Prevents false-positive lag kicks
    });

    bot.once('spawn', () => {
        console.log(`${bot.username} has successfully spawned in the world!`);
        
        // Wait 3 seconds for the server plugins to finish loading, then log in
        setTimeout(() => {
            console.log("Sending login command to chat...");
            bot.chat('/login BotPassword123');
        }, 3000);

        // Put the bot safely into Spectator mode right after log in
        setTimeout(() => {
            bot.chat('/gamemode spectator');
        }, 5000);
    });

    bot.on('kicked', (reason) => {
        console.log(`Bot was kicked from the server. Reason: ${reason}`);
    });

    bot.on('error', (err) => {
        console.error(`Network error encountered: ${err.message}`);
    });

    bot.on('end', () => {
        console.log('Connection closed. Retrying connection loop in 15 seconds...');
        setTimeout(createBot, 15000); // 15-second cooldown to stop spamming kicks
    });
}

createBot();
