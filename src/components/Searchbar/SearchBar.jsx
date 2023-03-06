import React, { Component } from 'react';
import {
  Bar,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
  SearchForm,
} from './SearchBarStyled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      // alert('Please, enter the correct search query');
      toast.error('Please, enter the correct search query');
      return;
    }

    this.props.editValue(this.state.value);
  };

  render() {
    return (
      <Bar className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <SearchFormButtonLabel className="button-label">
              Search
            </SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Bar>
    );
  }
}
