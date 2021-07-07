module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.queue} - Music stopped as there is no more music in the queue !\n Just type kl ! play song to start rolling again`);
};