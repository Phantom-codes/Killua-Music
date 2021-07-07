const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'nowplaying',
    aliases: ['np', 'playing'],
    description: 'Whats playing currently',
    //args: true,
    usage: ['song-name/url'],

    async execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;
        const npemd = new MessageEmbed();
        npemd
            .setColor('00FF00')
            .setDescription(`**${client.emotes.queue + track.title}**\n\n Author-  ${track.author}\n From Playlist-  ${track.fromPlaylist ? 'Yes' : 'No'}\n` + ` Requested By-  ${track.requestedBy.username}\n` +
                ` Volume-  ${client.player.getQueue(message).volume}\nRepeat mode - ${client.player.getQueue(message).repeatMode ? 'Yes' : 'No'}  Currently Paused-  ${client.player.getQueue(message).paused ? 'Yes' : 'No'}` +
                `\n Duration-  ${track.duration}\n Filters- ${filters.length + '/' + client.filters.length}**Progress Bar**\n${client.player.createProgressBar(message, { timecodes: true })}`)
            .setThumbnail(track.thumbnail)
            .setTimestamp();

        message.channel.send(npemd);
    },
}