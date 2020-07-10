const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    category: "music",
    description: "Plays music using youtube api",
    run: async (client, guilds, message, args) => {
        const functions = require("../../library/music/youtubePlayer");

        const voiceChannel = message.member.voiceChannel;

        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use this function.");

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK'))
            return message.channel.send("I do not have the permissions to join your voice channel.");
        
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

        let songInfo;
        let song;
        try {
            songInfo = await ytdl.getInfo(args[0]);
            song = {
                title: songInfo.title,
                url: songInfo.video_url,
                length: songInfo.length_seconds
            };
        }
        catch (err) {
            console.log(err.message);
            return message.channel.send("Couldn't find the provided video. Please provide a youtube link.");
        }

        if (guild.songs.length == 0) {
            try {
                guild.songs.push(song);
                let connection = await voiceChannel.join();
                guild.connection = connection;
                functions.play(message, guild);
            } catch (err) {
                console.log(err);
                return message.channel.send("An error has occured while trying to play the music.");
            }
        } else {
            if (!guild.connection) { 
                let connection = await voiceChannel.join();
                guild.connection = connection;
            }
            guild.songs.push(song);
            return message.channel.send(`**${song.title}** has been added to the queue!`);
        }
    }
}