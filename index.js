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

// app.listen(port, () => console.log(`Server started on port ${port}`));
app.listen(port, () => {
    console.log(`占用端口 ${port}`);
});
const Discord = require("discord.js");
const client = new Discord.Client({intents: ['GUILD_MESSAGES','GUILDS']});
client.once("ready", async () => {
    console.log("连接成功！！！！！！");
});
client.login("MTA0OTY4MDMyMDk4ODk5MTU1MA.Ga-oeJ.Ar8ftzwFyqqpiVrLjaerfc6fh01ZDMN4Rk2v_w")
client.on("message", async message => {
    if (message.author == client.user) return;
    console.log(message);
    console.log(message.author.username);
    if(message.content=='有人吗'){
        message.channel.send('你好'+message.author.username)
    }
});

