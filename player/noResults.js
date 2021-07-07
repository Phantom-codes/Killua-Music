module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - No results found on YouTube and all my Sources for ${query} !`);
};