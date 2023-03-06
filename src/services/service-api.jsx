export const fetchApi = ({ value, page }) => {
  return fetch(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=30215084-a49b4b97181de8b711ff6b4da&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Not a valid request with title &{value}`));
  });
};
