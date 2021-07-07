const { prefix } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['command'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {

        const { commands } = message.client;

        const emd = new MessageEmbed()
            .setTitle(`Here is the list of all my commands`)
            .addField('Information', '`help`,`ping`,`prefix`,`uptime`, `invite`\nThese commands show most information about the bot')
            .addField('Whitelisted Commands', '`eval`, `reload`, `say`, `whitelist-get`\nThese commands can only be used by Whitelisted Users')
            .addField('Music Commands', '`clear-queue`, `disconnect`, `filter-list`, `filter`, `loop`, `nowplaying`, `pause`, `queue`, `resume`, `search`, `shruffle`, `skip`, `volume`')
            //.addField('Setup', '`setprefix` the only setup sets the guild prefix')
            .setDescription(`You can get more information about each command by using ${prefix}help command-name`)
            .setImage('https://cdn.discordapp.com/attachments/821649522672926740/848492451790323712/banner.png')
            .setThumbnail(`https://media4.giphy.com/media/MQWzFeayg3By8/200.gif?cid=643baa19izhoac7ipprwdmrz4t1xes880t3f3spnj73iszjk&rid=200.gif&ct=g`)
            .setColor(`#4169E1`);
        if (!args[0]) {
            message.channel.send(emd)
        } else {

            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.reply('that\'s not a valid command!');
            }
            let aliases = command.aliases;
            if (!aliases) {
                output = `None`
            } else {
                output = command.aliases.join(', ');
            }
            let usage = command.usage;
            if (!usage) {
                output1 = ` `
            } else {
                output1 = command.usage;
            }
            const cemd = new MessageEmbed();
            cemd
                .setTitle(`Informatiom about ${command.name}`)
                .setDescription(`**Aliases:** ${output}\n**Description:** ${command.description}\n**Usage:** ${prefix}${command.name} ${output1}\n**Cooldown:** ${command.cooldown || 3} second(s)`)
                .setFooter(`Used by - ` + message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setColor(`#2ffff9`)
            message.channel.send(cemd);
        }
    }

}
