import { join } from "path";
import { readdirSync } from "fs";

import { Command } from "./def";
import { client } from "..";

export const commands = new Array<Command>();

export default async function() {
    const rootCommandsDir = join(__dirname, "../", "commands/").trim();
    const commandSubDirs = readdirSync(rootCommandsDir);

    for (const subDir of commandSubDirs) {
        const commandFiles = readdirSync(join(rootCommandsDir, subDir)).filter(i => i.endsWith(".js"));
        for (const commandFile of commandFiles) {
            const command = (await import(join(rootCommandsDir, subDir, commandFile))).default;
            commands.push(command);
        }
    }

    const globalCommands = commands.filter(i => !i.devOnly);

    for (const command of (await client.application!.commands.fetch()).map(i => i.name)) {
        if(!globalCommands.map(c => c.name).includes(command)) {
            console.log(`Found unsynced command: ${command}`);
            client.application?.commands.create(globalCommands.find(c => c.name === command)!);
        }
    }

    for (const guild of client.config.testGuilds) {
        await (await client.guilds.fetch(guild.id)).commands.set(commands);
    };

    console.log(`Loaded ${commands.length} command(s).`);
}