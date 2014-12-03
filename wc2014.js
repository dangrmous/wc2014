var http = require('http');

var urlToFetch = 'http://worldcup.sfg.io/matches';

var usage = function () {
    console.log("Usage: node wc2014 'team name' - (if the team name is two words, use quotes)");
}

var team = process.argv[2];

team || usage();

var getGames = function () {

    var games = {};

    process.stdout.write("Fetching data...");

    http.get(urlToFetch, function (res) {
        var jsonGames = '';

        res.on('data', function (chunk) {
            jsonGames += chunk.toString();
            process.stdout.write(".");
        });

        res.on('end', function () {
            games = JSON.parse(jsonGames);
            process.stdout.write("\n");
            displayGames(games);
        })

        res.on('error', function (err) {
            console.error(err);
        });

    });

}

var displayGames = function(games){
    games.map(function(game){

            if((game.home_team.country == team) || (game.away_team.country == team)){
                if(game.winner){
                console.log("Match number: " + game.match_number);
                console.log(game.home_team.country + ": " + game.home_team.goals + "  " + game.away_team.country +
                ": " + game.away_team.goals);
                game.winner && console.log("Winner: " + game.winner);
                    console.log("---------")
                }

            }

    })
}

if (team) {
    getGames();
}




