import { Client, MessageAttachment } from "discord.js";
import { GatewayIntentBits } from "discord-api-types/v10";
import {DISCORD_TOKEN, DALLE_BACKEND} from "./config";
import axios from "axios";
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

const backend = new axios.Axios({
    baseURL: DALLE_BACKEND,
    headers: {
        'Bypass-Tunnel-Reminder': "go",
        'mode': 'no-cors'
    }
});

async function callDalleBackend(prompt: string): Promise<string> {
    try {
        const res = await backend.post("/dalle", JSON.stringify({text: prompt, num_images: 1}));
        const data: string[] = JSON.parse(res.data);
        return data[0];
    } catch (e) {
        console.error(e);
        return "";
    }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	if (interaction.commandName == "ping") {
        await interaction.reply("Pong!");
    } else if (interaction.commandName == "infer") {
        const prompt = interaction.options.getString("prompt");
        if (prompt == null) await interaction.reply("Bad prompt option.");
        else {
            await interaction.deferReply();
            const res = await callDalleBackend(prompt);
            const filename = prompt.split(" ").join("-") + ".png";
            if (res.length == 0) await interaction.editReply("No image generated. Try again later.");
            else {
                const buf = Buffer.from(res, "base64");
                const attachment = new MessageAttachment(buf, filename);
                await interaction.editReply({files: [attachment]});
            }
        }
    }
});

client.login(DISCORD_TOKEN);