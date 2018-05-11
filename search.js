// import * as JsSearch from 'js-search';

// var search = new JsSearch.Search('Official Name');
var tweets = []

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

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

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('topicSearch').addEventListener('keypress', function(evt) {
    // split value to keywords, search for every keyword
    const keyword = this.value.toLowerCase();
    if (keyword.length < 3) {
      return $('#results').html(`<h4 class="text-center text-danger">Please narrow your search</h4>`)
    }
    $('#results').html(`<div class="loader mx-auto"></div>`)
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
  $('#results').html("")
  filteredTweets.forEach(tweet => {
    // $('#results').append(`<div>${tweet.Tweets}</div>`)
    $('#results').append(`<ul class="list-group">
      <li class="list-group-item mx-auto" style="width: 1000px;">


          <p class=" d-inline font-weight-bold">${tweet["Official Name"]}</p>
          <p class="d-inline font-weight-light text-primary"> @ ${tweet["Twitter Handle"]}</p>

        <p>${tweet.Tweets}</p>
      </li>
    </ul>`)

  })
  // console.log(filteredTweets.length)
}



$.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/tweets.json", function(json) {

 tweets = json;
 // console.log(tweets);
   //  console.log(json); // this will show the info it in firebug console
   //






     // console.log(getObjects(tweets,'tweets','Edmund Moy'));
});

// var json = require('/tweets.json');
//var js = JSON.parse(json);
