const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const dotenv = require("dotenv");
dotenv.config();

const clientId = process.env["DISCORD_CLIENT"];
const token = process.env["DISCORD_TOKEN"];

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('infer').setDescription('Infer an image based on a prompt using Dalle-Mini!').addStringOption(option =>
		option.setName('prompt')
			.setDescription('The prompt to use for generating an image.')
			.setRequired(true)),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
