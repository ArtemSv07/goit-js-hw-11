// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';


const input = document.querySelector('input');
const form = document.querySelector('.form');
const fragment = document.createDocumentFragment();
const gallery = document.querySelector('.gallery');

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
  const inputValue = input.value.trim();

  if (!inputValue) {
    iziToast.warning({
      message: 'You forgot to enter your details',
    });
  } else {
    renderImg(inputValue);
  }
  input.value = '';
});

function renderImg(inputValue) {
  const getBaseUrl = () => {
    const url = new URL(BASE_URL);
    url.searchParams.append('key', KEY);
    return url;
  };

  const url = getBaseUrl();
  url.searchParams.append('q', inputValue);

  fetch(url)
    .then(response => response.json())

    .then(images => {
      const arrayImg = images.hits;
      if (arrayImg.length > 0) {
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
          galleryItem.classList.add('gallery-item');

          galleryItem.insertAdjacentHTML(
            'beforeend',
            `<a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
              <div class="div">
              <p>likes ${likes}</p>
              <p>views ${views}</p>
              <p>comments ${comments}</p>
              <p>downloads ${downloads}</p>
              </div>
            </a>`
          );
          fragment.appendChild(galleryItem);
        });
      } else {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      gallery.appendChild(fragment);
    
      lightbox.refresh();
    });
}
