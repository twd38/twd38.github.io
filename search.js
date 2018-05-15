var Name
var Twitter_Handle
var none
var Tweet
var tweets
var filtered_tweets = []

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

jQuery("#export").click(function(e){
  filterMethod = "none";
  console.log("Export");
  const keyword = document.getElementById('topicSearch').value.toLowerCase();
  // exportToCsv("trumptweeter.csv", filtered_tweets);
  // var parsedTweets = parseJSONToCSVStr(filtered_tweets);
  exportToCsvFile(filtered_tweets);

e.preventDefault();
});

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

jQuery("#Agency").click(function(e){
  filterMethod = "Agency";
  console.log("Filter name");
  const keyword = document.getElementById('topicSearch').value.toLowerCase();
  applyFilterOnTweets(keyword);

e.preventDefault();
});


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('topicSearch').addEventListener('input', function(evt) {
  // document.getElementById('topicSearch').addEventListener('keypress', function(evt) {
    // split value to keywords, search for every keyword
    const keyword = this.value.toLowerCase();
    if (keyword.length < 2) {
      return $('#results_ul').html(`<h4 class="text-center text-danger">Please narrow your search</h4>`)
    }
    // $('#results_ul').html(`<div class="loader mx-auto"></div>`)
    $('#results_ul').html(`<img id="loading" class="mx-auto" src="https://clipart.info/images/ccovers/1523212416donald-trump-head-wtf-png.png">`)
    applyFilterOnTweets(keyword);
  });
});

const applyFilterOnTweets = debounce(500, (keyword) => {
     filtered_tweets = tweets.filter(tweet => {
      return tweet.Tweet.toLowerCase().indexOf(keyword)!= -1;
    })
  updateResults(filtered_tweets);
  console.log(filtered_tweets);
})

const updateResults = (filteredTweets) => {

  // create element for every tweet
  $('#results_ul').html("")
  filteredTweetsSave = filteredTweets
  filteredTweetsSave.forEach(tweet => {

//----------------------DEFAULT FILTER----------------------
      if(filterMethod == ""){
        $('#results_ul').append(`
          <li class="list-group-item mx-auto" style="width: 1000px;">

              <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
              <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
              <p class="d-inline font-weight-light text-success float-right"> ${tweet["Date"]}</p>

            <p >${tweet.Tweet}</p>

            <div class="btn-group">
                <a href=${tweet["tweet_URL"]} target="_blank" class="btn btn-outline-primary">
                    <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
                </a>
            </div>
            <p class="d-inline font-weight-light text-warning float-right"> ${tweet["Agency"]}</p>
            <p class="d-inline font-weight-light text-secondary float-right"> - </p>
            <p class="d-inline font-weight-light text-danger float-right"> ${tweet["Job"]}</p>
          </li>

        `)
      }


//----------------------NO FILTER----------------------
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
                <a href=${tweet["tweet_URL"]} target="_blank" class="btn btn-outline-primary ">
                    <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
                </a>
            </div>
            <p class="d-inline font-weight-light text-warning float-right"> ${tweet["Agency"]}</p>
            <p class="d-inline font-weight-light text-secondary float-right"> - </p>
            <p class="d-inline font-weight-light text-danger float-right"> ${tweet["Job"]}</p>
          </li>
        `)
      }

//----------------------NAME FILTER----------------------
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
                <a href=${tweet["tweet_URL"]} target="_blank" class="btn btn-outline-primary ">
                    <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
                </a>
            </div>
            <p class="d-inline font-weight-light text-warning float-right"> ${tweet["Agency"]}</p>
            <p class="d-inline font-weight-light text-secondary float-right"> - </p>
            <p class="d-inline font-weight-light text-danger float-right"> ${tweet["Job"]}</p>
          </li>
        `)
      }

//----------------------DATE FILTER----------------------
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
                <a href=${tweet["tweet_URL"]} target="_blank" class="btn btn-outline-primary ">
                    <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
                </a>
            </div>
            <p class="d-inline font-weight-light text-warning float-right"> ${tweet["Agency"]}</p>
            <p class="d-inline font-weight-light text-secondary float-right"> - </p>
            <p class="d-inline font-weight-light text-danger float-right"> ${tweet["Job"]}</p>
          </li>
        `)
      }

//----------------------AGENCY FILTER---------------------
      if(filterMethod == "Agency"){
        filteredTweetsSave.sort(function(tweet_a, tweet_b){
        if(tweet_a["Agency"].toLowerCase() < tweet_b["Agency"].toLowerCase()) return -1;
        if(tweet_a["Agency"].toLowerCase() > tweet_b["Agency"].toLowerCase()) return 1;
        return 0;
        })

        $('#results_ul').append(`
          <li class="list-group-item mx-auto" style="width: 1000px;">

              <p class=" d-inline font-weight-bold"  > ${tweet["Name"]}</p>
              <p class="d-inline font-weight-light text-primary"> ${tweet["Twitter_Handle"]}</p>
              <p class="d-inline font-weight-light text-success float-right"> ${tweet["Date"]}</p>

            <p >${tweet.Tweet}</p>
            <div class="btn-group">
                <a href=${tweet["tweet_URL"]} target="_blank" class="btn btn-outline-primary ">
                    <i class="glyphicon glyphicon-floppy-disk" aria-hidden="true">Original Tweet</i>
                </a>
            </div>
            <p class="d-inline font-weight-light text-warning float-right"> ${tweet["Agency"]}</p>
            <p class="d-inline font-weight-light text-secondary float-right"> - </p>
            <p class="d-inline font-weight-light text-danger float-right"> ${tweet["Job"]}</p>
          </li>
        `)
      }
    })
    // console.log(filteredTweetsSave)

}
$.ajaxSetup({
    timeout: 20000 //Time in milliseconds
});

function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    function exportToCsvFile(jsonData) {
        let csvStr = parseJSONToCSVStr(jsonData);
        let dataUri = 'data:text/csv;charset=utf-8,'+ csvStr;

        let exportFileDefaultName = 'data.csv';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    function parseJSONToCSVStr(jsonData) {
    if(jsonData.length == 0) {
        return '';
    }

    let keys = Object.keys(jsonData[0]);

    let columnDelimiter = ',';
    let lineDelimiter = '\n';

    let csvColumnHeader = keys.join(columnDelimiter);
    let csvStr = csvColumnHeader + lineDelimiter;

    jsonData.forEach(item => {
        keys.forEach((key, index) => {
            if( (index > 0) && (index < keys.length-1) ) {
                csvStr += columnDelimiter;
            }
            csvStr += item[key];
        });
        csvStr += lineDelimiter;
    });

    return encodeURIComponent(csvStr);;
  }



//
// $.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/trump_appointees_100K_v3.json", function(json) {
//     console.log('json grabbed');
//     tweets=json;
//   })
//   .done(function(json) {
//     console.log(json;
//
//   })
//   .fail(function(json) {
//     console.log("Error!");
//   });

  $.getJSON("https://raw.githubusercontent.com/twd38/twd38.github.io/master/trump_appointees_100K_v3.json", function(json) {

  tweets=json
  // console.log(tweets)
  });
