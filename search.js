// import * as JsSearch from 'js-search';

// var search = new JsSearch.Search('Official Name');
var tweets = []
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
    return tweet.Tweets.toLowerCase().indexOf(keyword)!= -1;
  })
  updateResults(filtered_tweets);
})

const updateResults = (filteredTweets) => {
  // create element for every tweet
  $('#results_ul').html("")
  filteredTweetsSave = filteredTweets
  filteredTweets.forEach(tweet => {
    // $('#results').append(`<div>${tweet.Tweets}</div>`)

    if(filterMethod == ""){
      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">


            <p class=" d-inline font-weight-bold">${tweet["Official Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> @${tweet["Twitter Handle"]}</p>

          <p>${tweet.Tweets}</p>
        </li>
      `)
    }

    if(filterMethod == "none"){
      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">


            <p class=" d-inline font-weight-bold">${tweet["Official Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> @${tweet["Twitter Handle"]}</p>

          <p>${tweet.Tweets}</p>
        </li>
      `)
    }


    if(filterMethod == "Name"){
      // filteredTweetsSave.sort((tweet_a, tweet_b) => tweet_a["Official Name"] < tweet_b["Official Name"])

      filteredTweetsSave.sort(function(tweet_a, tweet_b){
      if(tweet_a["Official Name"].toLowerCase() < tweet_b["Official Name"].toLowerCase()) return -1;
      if(tweet_a["Official Name"].toLowerCase() > tweet_b["Official Name"].toLowerCase()) return 1;
      return 0;
      })

      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">


            <p class=" d-inline font-weight-bold">${tweet["Official Name"]}</p>
            <p class="d-inline font-weight-light text-primary"> @${tweet["Twitter Handle"]}</p>

          <p>${tweet.Tweets}</p>
        </li>
      `)
    }

    // //DATE FILTER
    // if(filterMethod == "Date"){
    //   // filteredTweetsSave.sort((tweet_a, tweet_b) => tweet_a["Official Name"] < tweet_b["Official Name"])
    //
    //   filteredTweetsSave.sort(function(tweet_a, tweet_b){
    //   if(tweet_a["Date"] < tweet_b["Date"] return -1;
    //   if(tweet_a["Date"] > tweet_b["Date"] return 1;
    //   return 0;
    //   })
    //
    //   $('#results_ul').append(`
    //     <li class="list-group-item mx-auto" style="width: 1000px;">
    //
    //
    //         <p class=" d-inline font-weight-bold">${tweet["Official Name"]}</p>
    //         <p class="d-inline font-weight-light text-primary"> @${tweet["Twitter Handle"]}</p>
    //
    //       <p>${tweet.Tweets}</p>
    //     </li>
    //   `)
    // }
    //
    // //AGENCY FILTER
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
    //
    //         <p class=" d-inline font-weight-bold">${tweet["Official Name"]}</p>
    //         <p class="d-inline font-weight-light text-primary"> @${tweet["Twitter Handle"]}</p>
    //
    //       <p>${tweet.Tweets}</p>
    //     </li>
    //   `)
    // }






    })
    console.log(filteredTweetsSave)


}


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



$.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/tweets.json", function(json) {

 tweets = json;
});
