module.exports = {
    name: 'stop',
    aliases: ['dc','disconnect', 'leave'],
    description: 'Bot Leaves the channel and say Good Bye',

    async execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        client.player.setRepeatMode(message, false);
        client.player.stop(message);

        message.channel.send(`${client.emotes.stop} - Music **stopped** into this server and I left the Channel!\nI Hope You will Call me again soon ;D`);
        
    },
}