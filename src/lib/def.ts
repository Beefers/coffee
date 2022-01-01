import {
    ApplicationCommandOptionData,
    ApplicationCommandType,
    ActivityOptions,
    Interaction,
    TextChannel,
    NewsChannel,
    GuildChannel,
    DMChannel,
    Channel,
    Guild,
    GuildMember,
    MessageEmbedOptions,
} from "discord.js";

export interface CommandOptions {
    name: string;
    description?: string;
    category: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType | "CHAT_INPUT";
    servers?: string[];
    ephemeral?: true;
    su?: true;
    execute(interaction: Interaction): any;
}

export class Command {
    public name: string;
    public description?: string;
    public category: string;
    public options?: ApplicationCommandOptionData[];
    public type?: ApplicationCommandType | "CHAT_INPUT";
    public servers?: string[];
    public ephemeral?: true;
    public su?: true;
    public execute: (interaction: Interaction) => any;

    public constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.description = commandOptions.description;
        this.category = commandOptions.category;
        this.options = commandOptions.options;
        this.type = commandOptions.type;
        this.servers = commandOptions.servers;
        this.ephemeral = commandOptions.ephemeral;
        this.su = commandOptions.su;
        this.execute = commandOptions.execute;
    }
}

// JSON Commands {{{
export interface JSONCommand {
    description?: string;
    format?: string;
    embed?: MessageEmbedOptions;
}
export interface CommandGroup {[command: string]: JSONCommand}
export interface CommandSet {[category: string]: CommandGroup}
// }}}

// Config {{{
export interface Server {
    id: string;
    alias: string;
}

export interface Config {
    servers?: Server[];
    users?: string[];
    activity?: ActivityOptions;
}
/// }}}