module.exports = {
    name: 'play',
    aliases: ['p', 'search'],
    description: 'Play Some Songs',
    //args: true,
    usage: ['song-name/url'],

    async execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send({ embed: { color: "00FF00", description: `${client.emotes.error} | You must be in a voice channel to play!` } });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embed: { color: "00FF00", description: `${client.emotes.error} | You are not in my voice channel!` } });
        const query = args.join(" ")
        if(!query) return message.channel.send({ embed: { color: "00FF00", description: `${client.emotes.error} | You should give me a song to play :c` } });

        client.player.play(message, args.join(" "), { firstResult: true });
        

    }
}

