/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
        <div class="tweetPosted">${tweetData.created_at}</div>
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
      $('.tweetContainer').append($tweet);
    }
  };

  renderTweets(data);

});
