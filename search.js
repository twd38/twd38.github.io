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

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('topicSearch').addEventListener('keypress', function(evt) {
    // split value to keywords, search for every keyword
    const keyword = this.value.toLowerCase();
    const filtered_tweets = tweets.filter(tweet => {
      return tweet.Tweets.toLowerCase().indexOf(keyword)!= -1;
    })
    updateResults(filtered_tweets);
  });
});

const updateResults = (filteredTweets) => {
  // create element for every tweet
  $('#results').html("")
  filteredTweets.forEach(tweet => {
    // $('#results').append(`<div>${tweet.Tweets}</div>`)
    $('#results').append(`<ul class="list-group">
      <li class="list-group-item">${tweet["Official Name"] + " : " + tweet.Tweets}</li>
    </ul>`)

  })
  console.log(filteredTweets.length)
}



$.getJSON("https://api.myjson.com/bins/17gwhy", function(json) {

 tweets = json;
 // console.log(tweets);
   //  console.log(json); // this will show the info it in firebug console
   //






     // console.log(getObjects(tweets,'tweets','Edmund Moy'));
});

// var json = require('/tweets.json');
//var js = JSON.parse(json);
