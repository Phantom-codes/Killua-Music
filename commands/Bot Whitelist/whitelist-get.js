module.exports = {
	name: 'whitelist-get',
	aliases: ['whitelist'],
	description: 'Get the total whitelisted users',
	args: false,
	execute(message, args, client){

		const whuser = [[], []];

		client.whitelist.forEach((user) => {
            const array = whuser[0].length > whuser[1].length ? whuser[1] : whuser[0];
			usr =  client.users.cache.find(usr => usr.id === user)
			details = usr.username + '(`'+user+'`)'

            array.push(details);
			
        });
	

        message.channel.send({
            embed: {
                color: '00FFFF',
                footer: { text: 'Providing best quality music from 700+ sources.' },
                fields: [
                    { name: 'Users-', value: whuser[0].join('\n'), inline: true },
                    { name: '** **', value: whuser[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `List of all Whitelisted Users`,
            },
        });

    },
}