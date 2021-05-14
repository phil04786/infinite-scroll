const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;//When page first load we want it to be false
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';

let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // count = 30;
    // apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM Elemnents
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
 
// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log(totalImages);
  // Run function for each Object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target', '_blank');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener, check when each is finished loadiing
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    //console.log(photosArray);
    displayPhotos();
    if (isInitialLoad){
        updateAPIURLWithNewCount(30);
        isInitialLoad = false;
    }
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();

    // console.log('window.innerHeight:', window.innerHeight);//Total height of browser window
    // console.log('window.scrollY:', window.scrollY);//Distance from top of page user has scrolled
    // console.log('window.innerHeight + window.scrollY', window.scrollY + window.innerHeight);
    // console.log('document.body.offsetHeight:', document.body.offsetHeight);//Height of everything in body , including what is nit within the view
    // console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);
    // console.log('load more');
  }
});

// On Load
getPhotos();
