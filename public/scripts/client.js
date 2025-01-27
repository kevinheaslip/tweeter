/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // convert potentially insecure text from user
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // takes in a tweet object, returns a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class="tweet">
      <header>
        <div>
          <span><img src="${tweetData.user.avatars}" alt="User avatar image"></span>
          <span>${tweetData.user.name}</span>
        </div>
        <div class="tweet-username">${tweetData.user.handle}</div>
      </header>
      <br>
      <p>${escape(tweetData.content.text)}</p>
      <br>
      <footer>
        <div class="tweet-posted">${timeago.format(tweetData.created_at)}</div>
        <div class="social-icons">
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
      $('.tweet-container').prepend($tweet);
    }
  };

  // fetches tweet JSON, clears tweet container and renders tweets
  const loadTweets = function() {
    $.getJSON("/tweets/", function(data) {
      console.log("Success, tweets retrieved from server");
      $('.tweet-container').html("");
      renderTweets(data);
    });
  };

  loadTweets();

  // event listener for form submit to prevent default behaviour and make an ajax request if conditions are met, if they aren't met display a relevant error
  $(function() {
    $("#tweet-form").on("submit", function(event) {
      console.log('Button clicked, performing ajax call...');
      event.preventDefault();

      const tweetText = $("#tweet-text");
      const errMsg = $(".error-message");
      const form = $(this);
      const data = $(this).serialize();

      if ($("#tweet-text").val().length > 140) {
        errMsg.html('Your tweet is longer than 140 characters!').slideDown();
      } else if (tweetText.val() === "" || tweetText.val() === null) {
        errMsg.html('You are trying to submit an empty tweet, please try again.').slideDown();
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
