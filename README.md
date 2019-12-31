# liri-node-app

This is an application that uses the Spotify API, OMDB API, and Bands in Town API.  You initialize the application by typing "node liri.js" in your bash terminal.  You will be presented with 4 options to select from using your arrow keys.  Once you select an option you can type whatever you want to search for pertaining to your intial choice.

"concert-this": This will take the entered band and search for tour locations and return dates and venues of the search.

"spotify-this-song": This will take the entered song and search the Spotify API, it will return the artist name, song name, a preview url from spotify (if available), and the album name.

"movie-this": This will take the entered movie and search the OMDB API, it will return the title, year released, IMDB and Rotten Tomatoes ratings, Country, language, plot, and the actors.

++++++ Important ++++++
******************************************************************************
You must have the modules listed below installed on your PC in the same file location as cloned files.  Node can be installed here: https://nodejs.org/en/.  All other packages can be installed in a bash terminal using npm.

-node.js
-node-spotify-api (you must have your own API key for this API)
-moment
-axios
-inquirer

Once installed, type "node liri.js" in your bash terminal.

******************************************************************************

Walkthrough:
<br>
<img src="images/Walkthrough-Step-1.jpg" alt="Walkthrough Step 1" width="650" height="377">
<img src="images/Walkthrough-Step-2.jpg" alt="Walkthrough Step 2" width="650" height="377">
<img src="images/Walkthrough-Step-3.jpg" alt="Walkthrough Step 3" width="650" height="377">
<img src="images/Walkthrough-Step-4.jpg" alt="Walkthrough Step 4" width="650" height="377">
<img src="images/Walkthrough-Step-5.jpg" alt="Walkthrough Step 5" width="650" height="377">