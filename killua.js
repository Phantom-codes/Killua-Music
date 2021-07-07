const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db')
const { token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const { Player } = require("discord-player");
const player = new Player(client);

client.player = player;
client.config = require('./config.json');
client.emotes = client.config.emotes;
client.filters = client.config.filters;
client.colors = client.config.colors;
client.whitelist = client.config.whitelist;

//command emitter
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
//event emitter
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
//Player Emmiter
const playerfile = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of playerfile) {
	console.log(`Loading discord-player event ${file}`);
	const event = require(`./player/${file}`);
	client.player.on(file.split(".")[0], event.bind(null, client));
};

const cooldowns = new Discord.Collection();


client.on('message', async message => {
	if (message.channel.type === 'dm') return;

	if (message.author.bot) return false;

	if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

	const gprefix = db.get(`gprefix-${message.guild.id}`);
	const prefixes = ['killua', 'kl!', '@Killua4419', gprefix];
	const prefix = prefixes.find(p => message.content.toLowerCase().startsWith(p));
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');

	}

});


client.login(token);