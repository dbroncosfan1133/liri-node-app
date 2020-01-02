require("dotenv").config();
var Spotify = require('node-spotify-api')
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var input = process.argv;
var userInput = input.slice(2).join(" ");


inquirer.prompt([

    {
        type: "list",
        name: "userChoice",
        message: "What do you want to do?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
    },

    {
        type: "input",
        name: "userInput",
        message: "What do you want to search?"
    }
]).then(function (userInput) {
    if (userInput.userChoice === "spotify-this-song") {
        Spotifyme(userInput.userInput)

        console.log("=================================================");
        console.log("");

    } else if (userInput.userChoice === "movie-this") {
        omdb(userInput.userInput)

        console.log("=================================================");
        console.log("");

    } else if (userInput.userChoice === "concert-this") {
        bandsInTown(userInput.userInput)

        console.log("=================================================");
        console.log("");

    } else {
        (userInput.userChoice === "do-what-it-says")
        readTxt()
        // bandsInTown(data)

        console.log("=================================================");
        console.log("");
    }
})

debugger
//Spotify function returns artists, name of the song, a spotify preview link, (if available)
//and the album the song is from.
//This function is called when spotify-this-song is selected in inquirer options
function Spotifyme(userInput) {
    if (userInput === "") {
        userInput = "Sound of Silence";
    }
    var spotify = new Spotify(keys.spotify)
    spotify.search({
        type: "track",
        query: userInput
    },
        function (err, data) {
            if (err) {
                console.log(err)
                return;
            } else {
                var songReturn = data.tracks.items;
                for (var i = 0; i < songReturn.length; i++) {

                    console.log(songReturn[i].album.artists[0].name + " \n" +
                        songReturn[i].name + " \n" +
                        songReturn[i].preview_url + " \n" +
                        songReturn[i].album.name + "\n")

                    fs.appendFile("log.txt", "************ Song Information ************" + " \n" + songReturn[i].album.artists[0].name + " \n" +
                        songReturn[i].name + " \n" +
                        songReturn[i].preview_url + " \n" +
                        songReturn[i].album.name + "\n" + " \n" + " \n", function (err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                }
                console.log(i + " results have been logged!");
            }
        })
};

//OMDB function, returns title, year, IMDB and Rotten Tomatoes ratings, Country, Language,
//plot, and actors are returned
//This function is called upon selecting "movie-this" in inquirer options

function omdb(userInput) {
    if (userInput === "") {
        userInput = "Mr Nobody";
    }
    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + userInput)
        .then(function (response) {
            var movie = response.data;
            console.log(movie.Title);
            console.log(movie.Year);
            console.log(movie.Ratings[0].Source + " " + movie.Ratings[0].Value);
            console.log(movie.Ratings[1].Source + " " + movie.Ratings[1].Value);
            console.log(movie.Country);
            console.log(movie.Language);
            console.log(movie.Plot);
            console.log(movie.Actors);

            fs.appendFile("log.txt", "************ Movie Information ************" + " \n" + movie.Title + "\n" + movie.Year +
                " \n" + movie.Ratings[0].Source + " " + movie.Ratings[0].Value +
                " \n" + movie.Ratings[1].Source + " " + movie.Ratings[1].Value +
                " \n" + movie.Country + " \n" + movie.Language +
                " \n" + movie.Plot + " \n" + movie.Actors + " \n" + " \n" + " \n", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("\nYour search result has been logged!")
                    }
                })
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};


//Bands in Town Function returns the Venue, City and State, and the show date
//function is called upon selecting "concert-this" in the inquirer options
function bandsInTown(userInput) {
    if (userInput === "") {
        userInput = "Eagles";
    }
    axios
        .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var bandReturn = response.data;
            for (var i = 0; i < bandReturn.length; i++) {
                console.log(bandReturn[i].venue.name + " \n" +
                    bandReturn[i].venue.city + " " + bandReturn[i].venue.region + " \n" +
                    moment(bandReturn[i].datetime).format("L") + " \n");

                fs.appendFile("log.txt", "************ Concert Information ************" + " \n" + bandReturn[i].venue.name + " \n" +
                    bandReturn[i].venue.city + " " + bandReturn[i].venue.region + " \n" +
                    moment(bandReturn[i].datetime).format("L") + " \n" + " \n" + " \n", function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
            }
            console.log(i + " results have been logged!")
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function readTxt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var beforeData = data;
        beforeData = beforeData.split(",").shift();

        var afterData = data;
        afterData = afterData.split(", ").pop();

        if (beforeData === "spotify-this-song") {
            Spotifyme(afterData);

        } else if (beforeData === "movie-this") {
            omdb(afterData);

        } else if
            (beforeData === "concert-this")
            bandsInTown(afterData);
    })
};