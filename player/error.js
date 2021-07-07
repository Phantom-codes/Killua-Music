module.exports = (client, error, message) => {
    if (error === 'Error [ERR_STREAM_DESTROYED]: input stream: Cannot call write after a stream was destroyed') return;
    switch (error) {

        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - There is no music being played on this server !`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - You are not connected in any voice channel !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - I am not able to join your voice channel, please check my permissions !`);
            break;
        default:
            client.channels.cache.get('843399272996667463').send(`${client.emotes.error} - Something went wrong ... Error : ${error}`);
    };
};
