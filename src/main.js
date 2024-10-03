import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const simpleLightbox = new SimpleLightbox('.js-gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchedValue = searchFormEl.elements.user_query.value.trim();
  if (searchedValue === '') {
    // перевірка
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'bottomRight',
    });
    return;
  }

  loaderEl.classList.remove('is-hidden');

  fetchPhotos(searchedValue)
    .then(data => {
      loaderEl.classList.add('is-hidden'); // Вимкнення лоадера при отриманні результатів
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomRight',
        });
        galleryEl.innerHTML = '';
        searchFormEl.reset();

        return;
      }
      const galleryCardsTemplate = data.hits
        .map(imgDetails => createGalleryCardTemplate(imgDetails))
        .join('');
      galleryEl.innerHTML = galleryCardsTemplate;
      simpleLightbox.refresh();
      loaderEl.classList.add('is-hidden');
    })
    .catch(err => {
      loaderEl.classList.add('is-hidden');
      iziToast.error({
        message: 'An error occurred. Please try again later.',
        position: 'bottomRight',
      });
      console.log(err);
    });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
