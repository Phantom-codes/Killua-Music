const config = require('../../config.json')
module.exports = {
    name: 'say',
    aliases: ['msg'],
    description: 'To say a message through bot.',
    usage: ['text'],
    guildOnly: true,
    execute(message, args) {
        whitelist = config.whitelist;
        length = whitelist.length;
        let var1 = 0;
        for (i = 0; i <= length; i++) {
            if (message.author.id === whitelist[i]) {
                var1++
            }
        }


        if (var1 < 1) return message.reply(`Only my devlopers are allowed to use this command`);

        let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
        message.channel.send(msg);
        message.delete();

    },
};