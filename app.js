import dotenv from 'dotenv'
import { football } from './src/services/football.api.js'
import messageBuilder from './src/functions/messageBuilder.function.js';
import Vonage from '@vonage/server-sdk'
import schedule from 'node-schedule'

dotenv.config()

// Football API Setup
football.setAPIKey(process.env.API_KEY);
football.setAPIHost(process.env.API_HOST);
football.setTeamId(4195)
football.setSeasonYear(2020);

// Vonage SDK Setup
const from = "MaccabiHaifa";
const to = process.env.VICTIM;

const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET
});

// run everyday at 8am
schedule.scheduleJob('0 8 * * *', async () => {
    const result = await football.getLostMatches();
    const randoMatch = result[Math.floor(Math.random() * result.length)];
    const message = messageBuilder(randoMatch, football.getTeamId());

    vonage.message.sendSms(from, to, message, { type: 'unicode' }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    });
})