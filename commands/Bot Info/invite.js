const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'links',
    aliases: ['invite', 'add'],
    description: 'Shows the links of the bot.',
    cooldown: 5,
    async execute(message) {
        const embed = new MessageEmbed()

            .setTitle(`Invite me by using below link`)
            
            .setDescription(`[Click Me to add to your server](https://discord.com/oauth2/authorize?client_id=842738546166202388&scope=bot&permissions=6563417921) and start vibing together with your favorite tracks
            \n Devloped by `+'`'+`! Phantom#1171 and _TheKaushikG_#5300`+'`'+` | Supported by Yuvii <3#6255 along with KevinSidd#4854`)
            .setThumbnail(`https://media4.giphy.com/media/MQWzFeayg3By8/200.gif?cid=643baa19izhoac7ipprwdmrz4t1xes880t3f3spnj73iszjk&rid=200.gif&ct=g`)

            .setColor('BLUE')
            .setFooter("Providing best quality music out there.");

        message.channel.send(embed);

    }
}
