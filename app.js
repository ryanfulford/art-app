// 1 - Create app object (to make use of namespacing)
const artApp = {};

// Save information which will be reused (e.g. API Key) within properties on the app object
artApp.apiKey = 'vkTLvGVT';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

// Create a method to make a call to the API and get some data back
  // THEN put API data on the page
  artApp.getArt = function(userChoice) {
    // use URL constructor to format API endpoint where request is made
    const url = new URL(artApp.apiUrl);
    // console.log(url);

    // format and add parameters to URL
    url.search = new URLSearchParams({
      // include API paramters here
      key: artApp.apiKey,
      q: userChoice,
      imgonly: true,
      ps: 25
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
      // console.log(jsonResponse.artObjects);

      // take data returned from API and passing it to the display method
      artApp.displayArt(jsonResponse.artObjects);
    })
  }

// Create method to take API data and display it on page
artApp.displayArt = function(artArray) {
  artArray.forEach(function(artPieces) {
    // console.log(artPieces);

    // extract the data from the API and save it within variables
    const artworkTitle = artPieces.title;
    const artworkImage = artPieces.webImage.url;
    const artist = artPieces.principalOrFirstMaker;
    const altText = artPieces.longTitle;

    // console.log(artworkTitle, artworkImage, artist, altText);

    // create an li element with class of 'piece' in which this information will be added
    const listElement = document.createElement('li');
    listElement.classList.add('piece');

    // create h2 element to hold the art title
    const heading = document.createElement('h2');
    heading.textContent = artworkTitle;

    // create an image element to hold the element
    const image = document.createElement('img');
      // this element node has src and alt properties
    image.alt = altText;
    image.src = artworkImage;

    // create a p element with a class of 'artist' to hold artist name
    const paragraphElement = document.createElement('p');
    paragraphElement.classList.add('artist');
    paragraphElement.textContent = artist;

    // take elements and add them to li
    // listElement.appendChild(heading).appendChild(image).appendChild(paragraphElement);
    listElement.appendChild(heading);
    listElement.appendChild(image);
    listElement.appendChild(paragraphElement);

    // add li to the ul so data is in the DOM
    const ulElement = document.querySelector('#artwork');
    ulElement.appendChild(listElement);
  })
}

artApp.setUpEventListeners = function() {
  document.querySelector('#animal').addEventListener('change', function(){
    console.log('new animal selected');
  })
}

// Create initializaton method to kickstart app
artApp.init = function() {  
  // Call method to get art data
  artApp.getArt('monkey');

  // Call method to create event listeners
  artApp.setUpEventListeners();

}

// Call intialization method (at the end of our code)
artApp.init();