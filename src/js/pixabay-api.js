const BASE_URL = 'https://pixabay.com/api/?';

export const fetchPhotos = searchedValue => {
  const urlParams = new URLSearchParams({
    key: '46327716-73f7a7ad818090b89dbb50822',
    q: searchedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
// one
