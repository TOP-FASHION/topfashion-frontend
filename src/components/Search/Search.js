import React from 'react';
import './Search.scss'

function Search() {
  return (
    <div className="search">
      <form className="search__form" action="">
        <input
          className="search__input"
          name="search"
          placeholder="Search over 10,000 products"
          aria-label="Site search"
          autoComplete="off"
        />
        <button className="search__button" type="submit">
          <i className="fas fa-search"></i>
        </button>
        <div className="search__border" />
      </form>
    </div>
  );
}

export default Search;
