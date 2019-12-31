require("dotenv").config();
var Spotify = require('node-spotify-api')
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var appChoice = process.argv[2];
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
]).then(function(userInput){
    if (userInput.userChoice === "spotify-this-song") {
        Spotifyme(userInput.userInput)

    console.log("=================================================");
    console.log("");
    
    } else if (userInput.userChoice === "movie-this") {
            omdb(userInput.userInput)

    console.log("=================================================");
    console.log("");

    } else {
        (userInput.userChoice === "concert-this")
        bandsInTown(userInput.userInput)

    console.log("=================================================");
    console.log("");
    }
    })


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
            }
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
    .then(function(response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value);
        console.log(response.data.Ratings[1].Source + " " + response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
    })
    .catch(function(error) {
        if(error.response) {
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
    axios
    .get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    .then(function(response) {
        var bandReturn = response.data;
        for (var i = 0; i < bandReturn.length; i++) {
        console.log(bandReturn[i].venue.name + " \n" +
        bandReturn[i].venue.city + " " + bandReturn[i].venue.region + " \n" + 
        moment(bandReturn[i].datetime).format("L") + " \n");
        }
    })
    .catch(function(error) {
        if(error.response) {
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