/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // takes in a tweet object, returns a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class="tweet">
      <header>
        <div>
          <span><img src="${tweetData.user.avatars}" alt="User avatar image"></span>
          <span>${tweetData.user.name}</span>
        </div>
        <div class="tweetUsername">${tweetData.user.handle}</div>
      </header>
      <br>
      <p>${tweetData.content.text}</p>
      <br>
      <footer>
        <div class="tweetPosted">${timeago.format(tweetData.created_at)}</div>
        <div class="socialIcons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-retweet"></i>
          <i class="fa-sharp fa-solid fa-heart"></i>
        </div>
      </footer>
      </article>
      <br>`);
    return $tweet;
  };

  // takes in an array of tweet objects, generates a tweet <article> for each tweet object and appends it to the tweets container
  const renderTweets = function(data) {
    for (const tweet of data) {
      const $tweet = createTweetElement(tweet);
      $('.tweetContainer').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.getJSON("/tweets/", function(data) {
      console.log("Success, tweets retrieved from server");
      $('.tweetContainer').html("");
      renderTweets(data);
    });
  };

  loadTweets();

  $(function() {
    // event listener for form submit to prevent default behaviour
    $("#tweet-form").on("submit", function(event) {
      const form = $(this);
      console.log('Button clicked, performing ajax call...');
      event.preventDefault();
      const data = $(this).serialize();
      if ($("#tweet-text").val().length > 140) {
        alert("Sorry, your tweet is longer than 140 characters!");
      } else if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
        alert("You are trying to submit an empty tweet, please try again.");
      } else {
        // use jQuery library to make an ajax POST request to the server with the serialized form data
        $.post("/tweets/", data, function() {
          console.log("Success, tweet sent to server");
          // clear tweet text from form
          form.trigger("reset");

          loadTweets();
        });
      }
    })
  });
});
