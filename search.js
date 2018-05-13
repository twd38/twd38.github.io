// import * as JsSearch from 'js-search';

// var search = new JsSearch.Search('Name');
var Name
var Twitter_Handle
var none
var Tweet
var tweets

var filteredTweetsSave = []
var filteredTweetsName = []
var filterMethod = ""

const debounce = (duration, fn) => {
  const state = { lastCall : Date.now() }
  let debouncedInterval = null

  return (...args) => {
    clearInterval(debouncedInterval);
    console.log('debounced')
    debouncedInterval = setTimeout(() => {
      console.log('called')
      fn(...args);
    }, duration)
  }
}

jQuery("#none").click(function(e){
  filterMethod = "none";
  console.log("Filter name");
  const keyword = document.getElementById('topicSearch').value.toLowerCase();
  applyFilterOnTweets(keyword);

e.preventDefault();
});

jQuery("#Name").click(function(e){
  filterMethod = "Name";
  console.log("Filter name");
  const keyword = document.getElementById('topicSearch').value.toLowerCase();
  applyFilterOnTweets(keyword);

e.preventDefault();
});

jQuery("#Date").click(function(e){
  filterMethod = "Date";
  console.log("Filter name");
  const keyword = document.getElementById('topicSearch').value.toLowerCase();
  applyFilterOnTweets(keyword);

e.preventDefault();
});




document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('topicSearch').addEventListener('keypress', function(evt) {
    // split value to keywords, search for every keyword
    const keyword = this.value.toLowerCase();
    if (keyword.length < 2) {
      return $('#results_ul').html(`<h4 class="text-center text-danger">Please narrow your search</h4>`)
    }
    $('#results_ul').html(`<div class="loader mx-auto"></div>`)
    applyFilterOnTweets(keyword);
  });
});

const applyFilterOnTweets = debounce(500, (keyword) => {
  const filtered_tweets = tweets.filter(tweet => {
    return tweet.Tweet.toLowerCase().indexOf(keyword)!= -1;
  })
  updateResults(filtered_tweets);
})

const updateResults = (filteredTweets) => {

  // create element for every tweet
  $('#results_ul').html("")
  filteredTweetsSave = filteredTweets
  filteredTweetsSave.forEach(tweet => {



    if(filterMethod == ""){
      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">

            <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
            <p class="d-inline font-weight-light text-success float-right"> ${tweet["Date"]}</p>

          <p >${tweet.Tweet}</p>

          <div class="btn-group">
              <a href=${tweet["tweet_URL"]} class="btn btn-outline-primary">
                  <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
              </a>
          </div>
          <p class="d-inline font-weight-light text-warning float-right"> ${tweet["Agency"]}</p>
        </li>

      `)
    }
      // <a href="${tweet["tweet_URL"]}"> Original Tweet </a>

    if(filterMethod == "none"){

      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
      }
      shuffleArray(filteredTweetsSave)

      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">

            <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
            <p class="d-inline font-weight-light text-success float-right"> ${tweet["Date"]}</p>

          <p >${tweet.Tweet}</p>
          <div class="btn-group">
              <a href=${tweet["tweet_URL"]} class="btn btn-outline-primary ">
                  <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
              </a>
          </div>


        </li>
      `)
    }


    if(filterMethod == "Name"){
      // filteredTweetsSave.sort((tweet_a, tweet_b) => tweet_a["Name"] < tweet_b["Name"])

      filteredTweetsSave.sort(function(tweet_a, tweet_b){
      if(tweet_a["Name"].toLowerCase() < tweet_b["Name"].toLowerCase()) return -1;
      if(tweet_a["Name"].toLowerCase() > tweet_b["Name"].toLowerCase()) return 1;
      return 0;
      })


      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">

            <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
            <p class="d-inline font-weight-light text-success float-right"> ${tweet["Date"]}</p>

          <p >${tweet.Tweet}</p>
          <div class="btn-group">
              <a href=${tweet["tweet_URL"]} class="btn btn-outline-primary ">
                  <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
              </a>
          </div>


        </li>
      `)
    }

    //DATE FILTER
    if(filterMethod == "Date"){
      // filteredTweetsSave.sort((tweet_a, tweet_b) => tweet_a["Name"] < tweet_b["Name"])

      filteredTweetsSave.sort(function(tweet_a, tweet_b){
      // if ($.datepicker.parseDate('dd/mm/yy', tweet_b["Date"]) > $.datepicker.parseDate('dd/mm/yy', tweet_a["Date"])) return -1;
      // if ($.datepicker.parseDate('dd/mm/yy', tweet_a["Date"]) > $.datepicker.parseDate('dd/mm/yy', tweet_b["Date"])) return 1;
      if(tweet_a["Date"] > tweet_b["Date"]) return -1;
      if(tweet_a["Date"] < tweet_b["Date"]) return 1;
      return 0;
      })


      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">

            <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
            <p class="d-inline font-weight-light text-success float-right"> ${tweet["Date"]}</p>

          <p >${tweet.Tweet}</p>

          <div class="btn-group">
              <a href=${tweet["tweet_URL"]} class="btn btn-outline-primary ">
                  <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
              </a>
          </div>


        </li>
      `)
    }

    //AGENCY FILTER
    // if(filterMethod == "Agency"){
    //   filteredTweetsSave.sort(function(tweet_a, tweet_b){
    //   if(tweet_a["Agency"].toLowerCase() < tweet_b["Agency"].toLowerCase()) return -1;
    //   if(tweet_a["Agency"].toLowerCase() > tweet_b["Agency"].toLowerCase()) return 1;
    //   return 0;
    //   })
    //
    //   $('#results_ul').append(`
    //     <li class="list-group-item mx-auto" style="width: 1000px;">
    //
    //         <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
    //         <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
    //
    //       <p >${tweet.Tweet}</p>
    //       <div class="btn-group">
    //           <a href=${tweet["tweet_URL"]} class="btn btn-outline-primary ">
    //               <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
    //           </a>
    //       </div>
    //
    //
    //     </li>
    //   `)
    // }





    })
    console.log(filteredTweetsSave)



}



// $.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/tweets2.json", function(tweets) {
//     console.log('json grabbed');
//   })
//   .done(function(tweets) {
//     console.log(tweets);
//   })
//   .fail(function(tweets) {
//     console.log("Error!");
//   });




  $.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/tweets2.json", function(json) {

  tweets=json
  console.log(tweets)
  });
