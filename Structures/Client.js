const Discord = require("discord.js");

const { REST, Routes } = require("discord.js");

// const { REST } = require("@discordjs/rest");

// const { Routes } = require('discord-api-types/v10');

const Command = require("./Command.js");

const Event = require("./Event.js");

const SlashCommand = require("./SlashCommand.js");

const config = require("../Data/config.json");

const intents = new Discord.IntentsBitField(8);

const fs = require("fs");

let slashCommands = []


class Client extends Discord.Client {
    constructor() {
        super({ intents, allowedMentions: { parse: ['users', 'roles'], repliedUser: false } });

        /**
         * @type {Discord.Collection<string, command>}
         */
        // this.commands = new Discord.Collection();

        this.slashcommands = new Discord.Collection();

        this.prefix = config.prefix;
    }

    start(token) {

        // fs.readdirSync("./Commands")
        //     .filter(file => file.endsWith(".js"))
        //     .forEach(file => {
        //         /**
        //          * @type {Command}
        //          */
        //         const command = require(`../Commands/${file}`);
        //         console.log(`Command ${command.name} loaded`);
        //         this.commands.set(command.name, command);

        //     });

        fs.readdirSync("./Events")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                /**
                 * @type {Event}
                 */
                const event = require(`../Events/${file}`);
                console.log(`Event ${event.event} loaded`);
                this.on(event.event, event.run.bind(null, this));

            });

        fs.readdirSync("./SlashCommands")
            .filter(file => file.endsWith(".js"))
            .forEach(file => {
                /**
                 * @type {SlashCommand}
                 */
                const slashCommand = require(`../SlashCommands/${file}`);

                console.log(`SlashCommand ${slashCommand.name} loaded`);

                this.slashcommands.set(slashCommand.name, slashCommand);

                if (slashCommand.options != undefined) {
                    slashCommands.push({"name": `${slashCommand.name}`, "description": `${slashCommand.description}`, "options": slashCommand.options});
                } else {
                    slashCommands.push({"name": `${slashCommand.name}`, "description": `${slashCommand.description}`});
                }

            });

        this.login(token);
        
        const rest = new REST({ version: '10' }).setToken(token);
  
        (async () => {
            try {
                if(false) {

                console.log('Started refreshing application (/) commands.');
                await rest.put(Routes.applicationCommands(config.clientId, config.guildId), { body: slashCommands });
            
                console.log('Successfully reloaded application (/) commands.');
            }
            } catch (error) {
            console.error(error);
            }
        })();

        this.on('interactionCreate', (interaction) => {
            if (interaction.isChatInputCommand()) {

                const Scommand = this.slashcommands.find(cmd => cmd.name == interaction.commandName);

                try {
                    Scommand.run(interaction, interaction.options._hoistedOptions, this);
                } catch {
                    interaction.reply(`Something went wrong while trying to run ${interaction.commandName}`)
                }
            }
        });
    }
}

module.exports = Client;