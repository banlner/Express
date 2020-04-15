const Discord = require('discord.js');
const client = new Discord.Client();
const active = new Map();
pingFrequency = (30 * 1000);

const prefix = '%';
const ownerID = '480987124405895168';

client.on('message', message => {

	let args = message.content.slice(prefix.length).trim().split(' ');
	let cmd = args.shift().toLowerCase();

	if(message.author.bot) return;
	if(!message.content.startsWith(prefix)) return;

	try {
		let ops = {
			ownerID: ownerID,
      active: active
		}
		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(client, message, args, ops);
	} catch (e) {
		console.log(e.stack);
	}
});

function getGuildsNumber() {
	client.shard.fetchClientValues('guilds.cache.size')
	.then(results => {
		return client.user.setActivity(`%help | %invite | ${results.reduce((prev, guildCount) => prev + guildCount, 0)} servers`);
	})
	.catch(console.error);
}

client.on('ready', () => {
	getGuildsNumber();
    client.setInterval(getGuildsNumber, pingFrequency);
});
client.login("Njk4MDg1MzQ1MDg2MDEzNDgw.XpBz8w.p4g4qhJYURtlaB49d6CquSN-3r0");