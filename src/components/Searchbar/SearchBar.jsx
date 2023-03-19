import { useState } from 'react';

import {
  Bar,
  SearchFormButton,
  SearchFormInput,
  SearchFormButtonLabel,
  SearchForm,
} from './SearchBarStyled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SearchBar({ editValue }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      toast.error('Please, enter the correct search query');
      return;
    }
    editValue(value);
  };

  return (
    <Bar className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel className="button-label">
            Search
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          value={value}
          onChange={handleChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Bar>
  );
}
