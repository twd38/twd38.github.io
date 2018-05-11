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

 var json = {
   "Official Name": "Edmund Moy",
   "Twitter Handle": "EdmundCMoy",
   "": "",
   "Tweets": "Kid Rock's Pro-Trump T-Shirts Are Ticking Everybody Off. Seems like rebelling is only for liberal artists. https://t.co/H5MOE8NyZY"
 },
 {
   "Official Name": "Edmund Moy",
   "Twitter Handle": "EdmundCMoy",
   "": "",
   "Tweets": "Refusing To Serve People You Don't Agree With Is Suddenly Not Bigotry. A liberal double standard. https://t.co/JTqatPq5M3"
 },
 {
   "Official Name": "Edmund Moy",
   "Twitter Handle": "EdmundCMoy",
   "": "",
   "Tweets": "Yet no outage among liberal artists, academia, or historians. https://t.co/HI1rdk3dzT"
 };

// var json = (function() {
//         var json = null;
//         $.ajax({
//             'async': false,
//             'global': false,
//             'url': "/tweets.json",
//             'dataType': "json",
//             'success': function (data) {
//                 json = data;
//             }
//         });
//         return json;
//     })();

var js = JSON.parse(json);

console.log(getObjects(json,'Official Name','Edmund Moy'));
