module.exports = {
    name: "stop",
    category: "music",
    description: "Empties the queue and leaves the channel",
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
        
        if (guild.songs.length == 0) return message.channel.send("There are no song playing.");
        else {
            guild.songs = [];
            guild.connection.dispatcher.end();
            guild.voiceChannel.leave();
            return message.channel.send("Queue emptied, leaving the voice channel.");
        }
    }
}