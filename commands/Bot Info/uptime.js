const { MessageEmbed } = require('discord.js');
const moment = require("moment");
const Discord = require("discord.js")

module.exports = {
    name: 'uptime',
    aliases: ['online'],
    description: 'Shows the uptime of the bot.',
    cooldown: 5,
    async execute(message) {
        const bot = message.client;
       require("moment-duration-format");
       const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        let serverembed = new MessageEmbed()
        .setTitle("Killua's Uptime")
            .setColor("#00ff62")
            .setDescription('I am listening music with guys from **'+ duration+'**')
            .setFooter('Did you liked time spent with me? if yes then type kl!add xD')

        message.channel.send(serverembed);
    }
}
