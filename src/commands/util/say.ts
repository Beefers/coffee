import { CoffeeVM, DiscordVMContext, Command } from "../../lib/def";
import { CommandInteraction, TextBasedChannel } from "discord.js";
import { run } from "cumlisp";

import { client } from "../..";

export default new Command({
    name: "say",
    description: "Sends a given message, capable of parsing LISP.",
    options: [
        {
            name: "text",
            description: "What to say",
            type: "STRING",
            required: true,
        }
    ],
    callback: async (interaction: CommandInteraction) => {
        const text = interaction.options.getString("text");
        const vmContext: DiscordVMContext = {
            client: client,
            interaction: interaction,
            channel: interaction.channel as TextBasedChannel,
            author: interaction.user,
            args: [],
        }
        
        let result: string;

        try {
            result = await run(text!, new CoffeeVM(vmContext));
        } catch(e) {
            result = `**Formatting error**: \`${e}\` (was your LISP correct?)`;
        }

        const padding = `*${interaction.user.toString()} says:*\n`;

        return interaction.editReply({ content: padding + result.substring(0, padding.length) });
    }
});
