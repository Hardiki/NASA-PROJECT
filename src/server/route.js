var express = require('express');
var request = require('request');
var router = express.Router();
var rovers = [
  "curiosity",
  "spirit",
  "opportunity"
]

function fetchData(url) {
  var promise = new Promise((resolve, reject) => {
    request(url, function(error, res, body) {
      if(error) {
        reject(error)
      }
      else {
        resolve(JSON.parse(body));
      }
    })
  })
  return promise;
}

function titleCase(text) {
  text = text[0].toUpperCase() + text.slice(1);

  return text;
}

router.get('/', async function(req, res, next) {
  let roversData = {};
  for(i in rovers){
    rover = rovers[i];
    url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=1000&api_key=BpKvg1uUt8Yy1pauIcV66nYPCPLIJfBFqzEoxB98&page=1"; 
    
    try {
      fetchedContent = await fetchData(url);
    } catch(e) {
      return console.log(e);
    }

    roversData[rover] = fetchedContent.photos[0].rover;
  }
  res.render("index", { data: roversData });
});

router.get('/gallery', async (req, res) => {
  var q = req.query.q;
  console.log(q);
  jsonObj = {};
  url = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + q + "/photos?sol=1000&api_key=BpKvg1uUt8Yy1pauIcV66nYPCPLIJfBFqzEoxB98&page=1"; 
  try { 
    fetchedContent = await fetchData(url);
  } catch(e) {
    return console.log(e);
  }

  fetchedContent.rover = titleCase(q);

  res.render('gallery', { data: fetchedContent })  
})

module.exports = router;