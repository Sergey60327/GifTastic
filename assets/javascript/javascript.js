 var topics = ["United States", "United Kingdom", "Canada", "France", "Russia", "Mexico", 
               "Nicaragua", "Germany", "Italy", " Albania", "Sweden", "Armenia", "Portugal",
               "Thailand", "Denmark", "Finland", "Greece"];
  
       // Lets get gif videos
      function displayCountryVideo() {
        
        //clear gif videos
        $("#country-view").empty();
        
        // we are adding attributes to add to query URL
        var countries = $(this).attr("data-name");
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        countries + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        // Creating an AJAX call for the specific country button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          
          // Creating a div to hold the country
          var countryDiv = $("#country-view");

           results = response.data;

           countryRating = response.data.rating;

          for (var i = 0; i < results.length; i++) {
            
            var countryMove = results[i].images.original.url;
            var countryStill = results[i].images.original_still.url;
            countryRating = results[i].rating;

            $("#country-view").append("<div class='moveLeft'><p>Rating: "+countryRating+"</p><p><img class='animate' id='"+countryMove+"'src="+countryStill+"></p></div>");


          };
          });
      };



      // Function for displaying movie data
      function renderButtons() {
        // Deleting the country buttons prior to adding new country buttons
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("country");
          // Adding a data-attribute with a value of the country at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the country at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        };
      };
      // This function handles events where one button is clicked
      $("#add-country").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var countries = $("#country-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(countries);
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    
        $("#country-input").val("");
      });
      
      


      $("#country-view").on("click", ".animate", function(){

      var videoAnimate = $(this).attr("id");
      var videoStill   = $(this).attr("src");

      $(this).attr("id", videoStill );
      $(this).attr("src", videoAnimate);
      $(this).attr("class", "still");

});

    $("#country-view").on("click", ".still", function(){
     console.log('xxx');
      var videoAnimate = $(this).attr("src");
      var videoStill   = $(this).attr("id");

      $(this).attr("id", videoAnimate);
      $(this).attr("src", videoStill);
      $(this).attr("class", "animate");

});
    
$("#buttons-view").on("click", ".country",displayCountryVideo);
    
      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
