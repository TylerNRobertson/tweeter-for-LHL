/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetData) {

  let article = $('<article>').addClass('tweet');

// Tweet Header Creation

    let header = $('<header>').addClass('tweetHeader').addClass('clearFix');
        let userImage = $('<img>').addClass('userImage').attr('src', tweetData.user.avatars.regular).attr('width', '80px').attr('height', '80px;')
        let tweetName = $('<h2>').text(tweetData.user.name);
        let userHandle = $('<p>').addClass('userHandle').text(tweetData.user.handle);
    let content = $('<p>').addClass('tweetContent').text(tweetData.content.text);
    header.append(userImage).append(tweetName).append(userHandle);

// Tweet Footer Creation

    let footer = $('<footer>')
      let retweet = $('<i>').addClass('fa').addClass('fa-retweet').addClass('action').attr('aria-hidden', 'true');
      let like = $('<i>').addClass('fa').addClass('fa-heart').addClass('action').attr('aria-hidden', 'true');
      let report = $('<i>').addClass('fa').addClass('fa-flag').addClass('action').attr('aria-hidden', 'true');
      let timeStamp = $('<p>').addClass('timeStamp').text('10 minutes ago');
    footer.append(retweet).append(like).append(report).append(timeStamp);

// Contruct the full article of the tweet (Append all previous portions together)

  article.append(header).append(content).append(footer);
  return article;

};

// -----------------------------------------------------------------------------
//                                AJAX and posting Tweets
// -----------------------------------------------------------------------------


// Render Tweets on the site/page

function renderTweets(tweetData) {
for (let tweet of tweetData) {
  let article = createTweetElement(tweet);
  $('#tweets').prepend(article);
}}

// Load Tweets

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (tweets) {
      console.log('Tweet created and Posted');
      renderTweets(tweets);
    }
  })
}

// Prevent Default action & serialize data

$('#createTweet').on('submit', submitListener);
function submitListener(e) {
  e.preventDefault();
  if (formChecker($(this))){
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $(this).serialize(),
  })
  .done(function(tweet) {
      console.log('Success: ');
      loadTweets();
    });
}
};

// Form Checker

function formChecker (form) {
  let text = form.find('textarea')
  if (text.val() == "") {
    alert('Error 404: Your tweet must contain atleast 1 valid character! Please fix and try again');
    return false;
  }
  if (text.val().length > 140) {
    alert('Error 404: Your tweet cannot contain more than 140 characters! Please fix and try again.')
    return false;
  }
  return true;
}

// -----------------------------------------------------------------------------
//                                Extras and Calling Functions
// -----------------------------------------------------------------------------

// Hide/Show compose area

  $("#compose").click(function(){
    $("#tweetCreate").slideToggle();
      $('#tweetArea').select();
  });

// Calling functions
loadTweets();
