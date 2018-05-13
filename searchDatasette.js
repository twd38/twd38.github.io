// import * as JsSearch from 'js-search';

// var search = new JsSearch.Search('OfficialName');
var OfficialName
var TwitterHandle
var none
var tweet
var tweets
var Tweets_array = []
var Small_Tweets_array = []
var filteredTweetsSave = []
var filteredTweetsName = []
var filterMethod = ""
var j

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
  filteredTweetsSave.forEach(tweet => {



    if(filterMethod == ""){
      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">

            <p class=" d-inline font-weight-bold">${tweet["OfficialName"]}</p>
            <p class="d-inline font-weight-light text-primary"> @${tweet["TwitterHandle"]}</p>

          <p>${tweet.Tweets}</p>
        </li>
      `)
    }

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

            <p class=" d-inline font-weight-bold">${tweet["OfficialName"]}</p>
            <p class="d-inline font-weight-light text-primary"> @${tweet["TwitterHandle"]}</p>

          <p>${tweet.Tweets}</p>
        </li>
      `)
    }


    if(filterMethod == "Name"){
      // filteredTweetsSave.sort((tweet_a, tweet_b) => tweet_a["OfficialName"] < tweet_b["OfficialName"])

      filteredTweetsSave.sort(function(tweet_a, tweet_b){
      if(tweet_a["OfficialName"].toLowerCase() < tweet_b["OfficialName"].toLowerCase()) return -1;
      if(tweet_a["OfficialName"].toLowerCase() > tweet_b["OfficialName"].toLowerCase()) return 1;
      return 0;
      })

      $('#results_ul').append(`
        <li class="list-group-item mx-auto" style="width: 1000px;">


            <p class=" d-inline font-weight-bold">${tweet["OfficialName"]}</p>
            <p class="d-inline font-weight-light text-primary"> @${tweet["TwitterHandle"]}</p>

          <p>${tweet.Tweets}</p>
        </li>
      `)
    }

    // //DATE FILTER
    // if(filterMethod == "Date"){
    //   // filteredTweetsSave.sort((tweet_a, tweet_b) => tweet_a["OfficialName"] < tweet_b["OfficialName"])
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
    //         <p class=" d-inline font-weight-bold">${tweet["OfficialName"]}</p>
    //         <p class="d-inline font-weight-light text-primary"> @${tweet["TwitterHandle"]}</p>
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
    //         <p class=" d-inline font-weight-bold">${tweet["OfficialName"]}</p>
    //         <p class="d-inline font-weight-light text-primary"> @${tweet["TwitterHandle"]}</p>
    //
    //       <p>${tweet.Tweets}</p>
    //     </li>
    //   `)
    // }





    })
    console.log(filteredTweetsSave)



}






  // function getFile(){
  //   $.getJSON("http://fast-falls-98249.herokuapp.com/tweets_database-71af72e/Officials%2C+Handles+and+Tweets+-+SheetOG.json?_next="+i*100, function(j1) {
  //     small_Tweets_array = []
  //
  //   // json= $.getJSON("http://fast-falls-98249.herokuapp.com/tweets_database-71af72e/Officials%2C+Handles+and+Tweets+-+SheetOG.json?_next="+i*100)
  //   // j1 = (function(j){}())
  //     // console.log(j1);
  //       for (var i=0; i<j1['rows'].length; i++) {
  //
  //           var Tweets={OfficialName: "",
  //               TwitterHandle: "",
  //               none: "",
  //               Tweets: ""};
  //           Tweets.OfficialName = j1['rows'][i][0];
  //           Tweets.TwitterHandle = j1['rows'][i][1];
  //           Tweets.none = j1['rows'][i][2];
  //           Tweets.Tweets= j1['rows'][i][3];
  //           Small_Tweets_array.push(Tweets) // append them all into one JSON
  //
  //       }
  //
  //       // callback(Small_Tweets_array)
  //
  //       });
  //       return Small_Tweets_array
  //
  //       console.log(Small_Tweets_array);
  //     }
  //
  //     k = 12000/100
  //     for(var i = 0;i<k;i++){
  //       getFile()
  //       // console.log(Small_Tweets_array);
  //     }


  //convert to the format we need: simplify JSON to a list of hashables i.e. dictionary
    // Tweets_array=Small_Tweets_array


// $.getJSON("http://fast-falls-98249.herokuapp.com/tweets_database-71af72e/Officials%2C+Handles+and+Tweets+-+SheetOG.json?_next="+200, function(json) {
// Tweets_array = []
//   for (var i=0; i<json['rows'].length; i++) {
//
//       var Tweets={OfficialName: "",
//           TwitterHandle: "",
//           none: "",
//           Tweets: ""};
//       Tweets.OfficialName = json['rows'][i][0];
//       Tweets.TwitterHandle = json['rows'][i][1];
//       Tweets.none = json['rows'][i][2];
//       Tweets.Tweets= json['rows'][i][3];
//       Tweets_array.push(Tweets)
//
//   }
//   console.log(Tweets_array);
//
//   tweets = Tweets_array;
//
// });


$.getJSON("http://fast-falls-98249.herokuapp.com/tweets_database-71af72e/Officials%2C+Handles+and+Tweets+-+SheetOG.json?_next="+200, function(json) {
Tweets_array = []

  for (var i=0; i<json['rows'].length; i++) {

      var Tweets={OfficialName: "",
          TwitterHandle: "",
          none: "",
          Tweets: ""};
      Tweets.OfficialName = json['rows'][i][0];
      Tweets.TwitterHandle = json['rows'][i][1];
      Tweets.none = json['rows'][i][2];
      Tweets.Tweets= json['rows'][i][3];
      Tweets_array.push(Tweets)

  }
  console.log(Tweets_array);

  tweets = Tweets_array;

});

// $.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/tweets.json", function(json2) {
//
// console.log(json2);
//
// });
