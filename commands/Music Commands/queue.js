const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: 'Whats next in the list',

    async execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send({ embed: { color: "00FF00", description: `${client.emotes.error} | You must be in a voice channel to play!` } });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({ embed: { color: "00FF00", description: `${client.emotes.error} | You are not in my voice channel!` } });
        const queue = client.player.getQueue(message)
        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No songs currently playing !`);
        const qemd = new MessageEmbed();
        qemd
        .setColor(`00FFFF`)
        .setTitle(`Server Queue - ${message.guild.name} ${client.emotes.queue}`)
        .setThumbnail(client.player.nowPlaying(message).thumbnail)
        .setFooter(`Best Quality tracks Powered By Killua`)
        .setDescription(`${client.player.getQueue(message).loopMode ? '(looped)' : ''}**Current** : ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`));
        
        message.channel.send(qemd);

    }
}

