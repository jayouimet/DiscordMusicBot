module.exports = {
    name: "queue",
    category: "music",
    description: "Lists the songs in the queue",
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
        if (guild.songs.length <= 0) return message.channel.send("The queue is empty.");
        
        let msg = "```List of the songs :\n";
        let counter = 0;
        guild.songs.forEach(s => {
            msg = msg.concat(++counter, ". ", s.title, " - ", Math.floor(s.length / 60), ":", s.length % 60, "\n");
        }); 
        msg = msg.concat("```");

        return message.channel.send(msg);
    }
}