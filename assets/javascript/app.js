// array with artists/bands

var topics = ["Beyonce", "Madonna", "Cher", "Taylor Swift", "Lady Gaga", "Adele", "Celine Dion", "Selena", "Ella Fitzgerald", "Stevie Nicks", "Missy Elliot", "Katy Perry", "Spice Girls", "Janet Jackson", "Paula Abdul", "Kelly Clarkson", "TLC", "Sia", "Tina Turner", "Whitney Houston"];

$(document).ready(function() {

// displayArtistsGif function re-renders the HTML to display the appropriate content
  function displayArtistsGif() {

    // artist variable
    var artist = $(this).attr("data-name");
    // API URL to be queried
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=eXssaD9YeTfAYOKoPh2z6l27EN6AsQD5&limit=10";

    // Creating an AJAX call for the specific artist button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      //console.log(response)

      // Clears out gifsDisplay div in case there are existing images already there
      $("#gifsDisplay").empty();

      var results = response.data

      // Looping through each response
      for (var i = 0; i < results.length; i++) {

        // Creating a div to hold the artist
        var artistsDiv = $("<div class='artist'>");

        // Storing the rating data
        var rating = results[i].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        artistsDiv.append(pOne);

        // Creating an element to hold the image
        var giphyImage = $("<img>").attr("class", "gifImage").attr("data-state", "still")

        // To use for starting/stopping images function below
        giphyImage.attr("src", results[i].images.fixed_height_still.url);
        giphyImage.attr({'data-animate' : results[i].images.fixed_height.url});
        giphyImage.attr({'data-state' : "still"});
        giphyImage.attr({'data-still' : results[i].images.fixed_height_still.url});

        // Appending the image
        artistsDiv.append(giphyImage);

        // Putting the image in the div
        $("#gifsDisplay").prepend(artistsDiv);

      }

    });

  }

  // Click function starting & stopping animated images
  $("#gifsDisplay").on("click", ".gifImage", function () {

    var state = $(this).attr('data-state');

      // If state is still, use the animated image URL
      // Else (the animated image is already in use), use the still image URL
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  });

  // Function for displaying artists data
  function renderButtons() {

    // Deleting the artists prior to adding the buttons (or the buttons repeat when one is added)
    $("#artistButtonsDiv").empty();

    // Looping through the array of artists
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each artist in the array
      var a = $("<button>");

      // Adding a class of artist-btn to our button
      a.addClass("artist-btn");

      // Adding a data-attribute
      a.attr("data-name", topics[i]);

      // Providing the initial button text
      a.text(topics[i]);

      // Adding the button to the artistButtonsDiv div
      $("#artistButtonsDiv").append(a);
    }
  }

  // Adding a click event listener to all elements with a class of "artist-btn"
  $(document).on("click", ".artist-btn", displayArtistsGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  // This function handles events where an artist button is clicked
  $("#add-artist").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var newArtist = $("#artist-input").val().trim();

    // Adding artist from the textbox to our topics array
    topics.push(newArtist);

    // Calling renderButtons which handles the processing of our artist array (with our new artist added)
    renderButtons();
  });

  // FUNCTION TO DISPLAY RANDOM GIF
  // the function that starts when the button is clicked
  $("#randomBtn").on("click", function() {

    // API URL to get a random cat
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=eXssaD9YeTfAYOKoPh2z6l27EN6AsQD5&limit=1";

    // AJAX call to get the data from the API endpoint
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // The API request has completed
      .then(function(response) {

      // Get image URL from API
        var imageUrl = response.data.image_original_url;

        // Create a virtual jQuery image
        var randomImage = $("<img>");

        // Apply attributes to jQuery image
        randomImage.attr("src", imageUrl);

        // Append jQuery Image to actual DOM
        $("#randomGif").prepend(randomImage);
      });
  });

});
