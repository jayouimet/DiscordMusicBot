module.exports.play = async function play(message, guild) {
    const ytdl = require("ytdl-core");
    const fs = require("fs");
    let song = guild.songs[0];

    if (!song) {
        guild.voiceChannel.leave();
        return;
    } else {
        message.channel.send(`Now playing : **${song.title}**`);
    }

    let totalFiles;
    fs.readdir('./temp', (error, files) => {
        totalFiles = files.length;
    });

    await new Promise(done => setTimeout(done, 500));

    const path = `./temp/file_${totalFiles}.webm`;

    await ytdl(
        song.url, 
        {filter: 'audioonly'}, 
        // {quality: 'highestaudio'}, 
        {liveBuffer: 300000},
        {highWaterMark: 1<<25}
        // {highWaterMark: 1024 * 1024 * 50}
    ).pipe(fs.createWriteStream(path, {flags: 'w'}));

    await new Promise(done => setTimeout(done, 1500));

    let readStream = fs.createReadStream(path);

    /*let readStream = ytdl(song.url, 
        {filter: 'audioonly'}, 
        {quality: 'highestaudio'}, 
        {liveBuffer: 300000},
        {highWaterMark: 1<<25}
        // {highWaterMark: 1024 * 1024 * 50}
    );*/

    const dispatcher = guild.connection.playStream(
            readStream
        )
        .on('end', () => {
            guild.songs.shift();
            fs.unlink(path, err => {
                if (err) throw err;
            });
            play(message, guild);
        })
        .on('error', error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithmic(guild.volume / 50);
}