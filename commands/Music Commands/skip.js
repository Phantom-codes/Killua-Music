module.exports = {
    name: 'skip',
    aliases: ['sk','next'],
    description: 'Skips the current song',

    async execute(message, args, client) {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No music currently playing !`);

        client.player.skip(message);

        message.channel.send(`${client.emotes.success} - The current music has just been **skipped** !`);
    }
}