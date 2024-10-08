import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.loader-btn');
loadMoreBtnEl.insertAdjacentElement('afterend', loaderEl);
const simpleLightbox = new SimpleLightbox('.js-gallery a', {
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  overlayOpacity: 1,
});

let currentPage = 1;
let searchedValue = '';
let totalHitsLoaded = 0;
let totalHits = 0;
const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchedValue = searchFormEl.elements.user_query.value.trim();

    if (searchedValue === '') {
      iziToast.warning({
        message: 'Please enter a search query.',
        position: 'bottomRight',
      });
      return;
    }

    galleryEl.innerHTML = '';
    totalHitsLoaded = 0;
    loaderEl.classList.remove('is-hidden');
    currentPage = 1;

    const response = await fetchPhotos(searchedValue, currentPage);
    const data = response.data;

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomRight',
      });
      searchFormEl.reset();
      loaderEl.classList.add('is-hidden');
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }

    totalHits = data.totalHits;

    const galleryCardsTemplate = data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryEl.innerHTML = galleryCardsTemplate;
    simpleLightbox.refresh();
    loadMoreBtnEl.classList.remove('is-hidden');
    searchFormEl.reset();
    totalHitsLoaded += data.hits.length;

    if (totalHitsLoaded >= totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (err) {
    console.log(err);
    iziToast.error({
      message: 'An error occurred. Please try again later.',
      position: 'bottomRight',
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;

    const response = await fetchPhotos(searchedValue, currentPage);
    const data = response.data;

    if (!data.hits || data.hits.length === 0) {
      return;
    }

    const galleryCardsTemplate = data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
    simpleLightbox.refresh();

    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();

    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    totalHitsLoaded += data.hits.length;

    if (totalHitsLoaded >= totalHits) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        timeout: 5000,
      });

      loaderEl.classList.add('is-hidden');
      loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
