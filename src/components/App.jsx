import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Circles } from 'react-loader-spinner';
import { Wrapper } from './AppStyled';
// import { imagesAPI } from '../services/service-api';
import { fetchApi } from '../services/service-api';

export function App() {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  const handleValueChange = value => {
    setImages([]);
    setValue(value);
    setPage(1);
    setTotalImages(0);
  };

  const handlePageChange = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (!value) {
      return;
    }

    setStatus('pending');
    console.log('before fetch');
    fetchApi({ value, page })
      .then(images => {
        setImages(prevState => [...prevState, ...images.hits]);
        setTotalImages(images.total);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    console.log('after fetch');
  }, [value, page]);

  return (
    <Wrapper>
      <SearchBar editValue={handleValueChange} />
      <ToastContainer autoClose={2000} />

      {images.length > 0 && <ImageGallery images={images} />}

      {status === 'pending' && (
        <Circles
          height="40"
          width="40"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}

      {images.length < totalImages && (
        <LoadMoreButton editPage={handlePageChange} />
      )}
    </Wrapper>
  );
}
