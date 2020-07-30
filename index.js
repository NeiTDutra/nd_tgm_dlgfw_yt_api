const TelegramBot = require('node-telegram-bot-api');
const token = '1308583928:AAF_kWiVMfNbs8bqDhiBbOcG2rb_rTmcBCM';
const bot = new TelegramBot(token, {polling: true});
const dialogFlow = require('./dialogflow');
const youtube = require('./ytsearch');

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const dfResponse = await dialogFlow.sendMessage(chatId.toString(), msg.text);
    console.log(dfResponse);

    let dfResponseText = dfResponse.text;

    if(dfResponse.intent === 'Opt7'){
        dfResponseText = await youtube.searchVideoUrl(dfResponseText, dfResponse.fields.video.stringValue);
    }

    bot.sendMessage(chatId, dfResponseText);
  });