import {
    ApplicationCommandOptionData,
    ApplicationCommandType,
    ActivityOptions,
    Interaction,
} from "discord.js";

export interface AuthOptions {
    discord: {
        token: string;
        clientId: string;
        publicKey: string;
    };
}

export class Auth {
    public discord: {
        token: string;
        clientId: string;
        publicKey: string;
    };

    public constructor(authOptions: AuthOptions) {
        this.discord = authOptions.discord;
    }
}

export interface ConfigOptions {
    servers: string[];
    users: string[];
    activity: ActivityOptions;
}

export class Config {
    public servers: string[];
    public users: string[];
    public activity: ActivityOptions;

    public constructor(configOptions: ConfigOptions) {
        this.servers = configOptions.servers;
        this.users = configOptions.users;
        this.activity = configOptions.activity;
    }
}

export interface CommandOptions {
    name: string;
    description?: string;
    category: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType | "CHAT_INPUT";
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
    public ephemeral?: true;
    public su?: true;
    public execute: (interaction: Interaction) => any;

    public constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.description = commandOptions.description;
        this.category = commandOptions.category;
        this.options = commandOptions.options;
        this.type = commandOptions.type;
        this.ephemeral = commandOptions.ephemeral;
        this.su = commandOptions.su;
        this.execute = commandOptions.execute;
    }
}