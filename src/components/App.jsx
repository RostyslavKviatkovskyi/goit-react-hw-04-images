import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './Button/Button';
import { Circles } from 'react-loader-spinner';
import { Wrapper } from './AppStyled';

export class App extends Component {
  state = {
    images: [],
    value: '',
    status: '',
    error: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=30215084-a49b4b97181de8b711ff6b4da&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`Not a valid request with title &{this.state.value}`)
          );
        })
        .then(images =>
          this.setState(prevState => ({
            ...prevState,
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleValueChange = value => {
    this.setState({ images: [], value: value || '' });
  };

  handlePageChange = e => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <Wrapper>
        <SearchBar editValue={this.handleValueChange} />
        <ToastContainer autoClose={2000} />

        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}

        {this.state.status === 'pending' && (
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

        {this.state.images.length > 0 && (
          <LoadMoreButton editPage={this.handlePageChange} />
        )}
      </Wrapper>
    );
  }
}
