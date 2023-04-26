$(document).ready(function() {
  // display remaining characters
  const charCounter = function() {
    const maxChar = 140;
    $("#tweet-text").on("keyup", function() {
      let currentChar = $(this).val().length;
      let remainingChar = maxChar - currentChar;
      //updates the counter to the current remaining characters
      let counter = $(this).next().children(".counter").html(remainingChar);
      // if there are no remaining characters apply the css class to make the negative counter red
      if (remainingChar < 0) {
        $(counter).addClass("counter-negative");
      }
      if (remainingChar >= 0) {
        $(counter).removeClass("counter-negative");
      }
    });
  };

  charCounter();
});
