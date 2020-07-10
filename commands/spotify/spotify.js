module.exports = {
    name: "spotify",
    category: "music",
    description: "Plays music using spotify api",
    run: async (client, guilds, message, args) => {
        return message.channel.send('***ThRoW nEw NoT iMpLeMeNtEd ExCePtIoN***');

        const SpotifyWebApi = require('spotify-web-api-node');
        const { config } = require("dotenv");
        const https = require('https');


        https.createServer(function (request, response) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("Hello World");
            response.end();
        }).listen(8888);

        config({
            path: __dirname + "/.env"
        });

        let scopes = ['streaming'],
            state = 'test';

        let spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_SECRET,
            redirectUri: 'http://localhost:8888'
        });

        const code = '';

        let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

        https.get(authorizeURL, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(data);
            });
        });

        console.log(authorizeURL);
        /*spotifyApi.authorizationCodeGrant(code)
        .then(function(data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            return spotifyApi.searchTracks('Popcorn Funk');
        })
        .then(function(data) {
            console.log('I got ' + data.body.tracks.total + ' results!');
            // console.log(data.body.tracks.items);
            // message.channel.send(data.body.tracks.items[0].name);
        })*/

        // console.log(authorizeURL);

        // message.channel.send("Logged!");
    }
}