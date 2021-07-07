module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: '0x00FF46',
            author: { name: `Here are your search results for ${query}` },
            footer: { text: 'Music powered by Killua-' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
            thumbnail: { url : `https://media4.giphy.com/media/MQWzFeayg3By8/200.gif?cid=643baa19izhoac7ipprwdmrz4t1xes880t3f3spnj73iszjk&rid=200.gif&ct=g` } ,
        },
    });
};