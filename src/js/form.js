// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';



const form = document.querySelector('.form');
const fragment = document.createDocumentFragment();
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader')

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '42159131-e2480a23f0f5c24b1f6f03d93';

const options = {
  overlayOpacity: 0.8,
  captionsData: 'alt',
  captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', options);

form.addEventListener('submit', event => {
  event.preventDefault();
  
  

  gallery.innerHTML = "";
  const input = document.querySelector('input');
  const inputValue = input.value.trim();

  if (!inputValue) {
    iziToast.warning({
      message: 'You forgot to enter your details',
    });
  } else {
    loader.classList.remove('hide')
    renderImg(inputValue);
  }
  input.value = '';
});

function renderImg(inputValue) {
  const getBaseUrl = () => {
    const url = new URL(BASE_URL);
    url.searchParams.append('key', KEY);
    url.searchParams.append('image_type', 'photo');
  url.searchParams.append('orientation', 'horizontal');
  url.searchParams.append('safesearch', true);
    return url;
  };
   
  const url = getBaseUrl();
  url.searchParams.append('q', inputValue);
 

  fetch(url)
    .then(response => response.json())
    .then(images => {

      const arrayImg = images.hits;

     if (arrayImg.length > 0) {
       rander(arrayImg)
     } else {

      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
          color: '#f83d04',  
      });
     }
     
      
    })
    .catch(error => {console.log(error)});
    
}



function rander(arrayImg) {
  
    arrayImg.forEach(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => {
      const galleryItem = document.createElement('li');
      galleryItem.classList.add('gallery-items');

      galleryItem.insertAdjacentHTML(
        'beforeend',
        `<a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          <ul class="gallery-ul">
          <li class="gallery-item"><h3 class="gallery-title">Likes</h3><p class="gallery-value">${likes}</p></li>
          <li class="gallery-item"><h3 class="gallery-title">Views</h3><p class="gallery-value">${views}</p></li>
          <li class="gallery-item"><h3 class="gallery-title">Comments</h3><p class="gallery-value">${comments}</p></li>
          <li class="gallery-item"><h3 class="gallery-title">Downloads</h3><p class="gallery-value">${downloads}</p></li>
        </ul>  
        </a>`
      );
      fragment.appendChild(galleryItem);
    });
  
    loader.classList.add('hide')
  gallery.appendChild(fragment); 
  lightbox.refresh();
}
