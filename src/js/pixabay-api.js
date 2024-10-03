import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export const fetchPhotos = (searchedValue, page) => {
  const axiosOptions = {
    params: {
      key: '45539852-e7385dbf9677b23660ec365b6',
      q: searchedValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  };
  return axios.get('', axiosOptions);
};
