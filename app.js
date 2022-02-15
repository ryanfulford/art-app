// 1 - Create app object (to make use of namespacing)
const artApp = {};

// Save information which will be reused (e.g. API Key) withing properties on the app object -> variables
artApp.apiKey = 'vkTLvGVT';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

// Create a method to make a call to the API and get some data back
  // THEN put API data on the page
  artApp.getArt = function() {
    // use URL constructor to format API endpoint where request is made
    const url = new URL(artApp.apiUrl);
    console.log(url);

    // format and add parameters to URL
    url.search = new URLSearchParams({
      // include API paramters here
      key: artApp.apiKey,
      q: 'monkey',
      imgonly: true
    });

    // FETCH data from API endpoint that has been constructed
    fetch(url)
    .then(function(apiResponse){
      // take Promise that is returned and parse it into JSON
      return apiResponse.json();
    })
    .then(function(jsonResponse){
      // this returns the entire object
      // console.log(jsonResponse);
      
      // this returns the property of artObjects which provides ONLY the art data
      console.log(jsonResponse.artObjects);
    })




  }

// Create initializaton method to kickstart app
artApp.init = function() {
  console.log('app initialized');
  
  // Call method to get art data
  artApp.getArt();
}

// Call intialization method (at the end of our code)
artApp.init();