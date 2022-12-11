const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => {
    console.log(`占用端口 ${port}`);
});
const Discord = require("discord.js");
const client = new Discord.Client({intents: ['GUILD_MESSAGES','GUILDS']});
client.once("ready", async () => {
    console.log("连接成功！！！！！！");
});
client.login("MTA0OTY4MDMyMDk4ODk5MTU1MA.G6U80o.SXqjbmea-preytn12fxe-HX0P4KkPr-siJuZv0")
client.on("message", async message => {
    if (message.author == client.user) return;
    if(message.content.includes('<@1049680320988991550>')){
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message.content,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        });

        const resText = response.data.choices[0].text;
        message.channel.send(resText)
        // message.channel.send('你好'+message.author.username)
    }
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
