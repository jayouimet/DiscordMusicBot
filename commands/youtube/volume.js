module.exports = {
    name: "volume",
    category: "music",
    description: "Changes the volume for the music played by the bot in this voice channel",
    run: async (client, guilds, message, args) => {
        const voiceChannel = message.member.voiceChannel;

        if (!message.guild.id) return message.channel.send("An error has occured identifying your discord server.");

        if (!guilds[message.guild.id]) {
            guilds[message.guild.id] = {
                songs: [],
                connection: null,
                volume: 50,
                voiceChannel: voiceChannel,
                textChannel: message.channel
            };
        }

        let guild = guilds[message.guild.id];

        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this function.");
        if (voiceChannel != guild.voiceChannel) return message.channel.send("You need to be in the same channel as me to use this function.");

        let parsedVolume = parseFloat(args[0]);

        if (parsedVolume && parsedVolume >= 0 && parsedVolume <= 100) {
            guild.volume = parsedVolume;
            guild.connection.dispatcher.setVolumeLogarithmic(guild.volume / 50);
            return message.channel.send(`Volume has been set to ${guild.volume}.`);
        } else {
            return message.channel.send("Please specify a volume between 0 and 100.");
        }
    }
}