module.exports = {
    name: "join",
    category: "music",
    description: "Join the voice channel",
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

        if (guild.voiceChannel != voiceChannel)
            guild.voiceChannel = voiceChannel;
        textChannel = message.channel;

        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this function.");
        
        voiceChannel.join();
        return message.channel.send("I have joined your voice channel.");
    }
}