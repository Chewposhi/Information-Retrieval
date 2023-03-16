// src/components/Search.js

//to-do: add useEffect Cleanup after fetch function implemented

import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';

function Search({details}) {

  const [searchInput, setSearchInput] = useState("");
  const [searchField, setSearchField] = useState("");
  const [searchResult, setSearchResult] = useState([{}]);

  const filteredMovies = details.filter(
    movie => {
      return (
        movie
        .movie_name[0]
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        movie
        .movie_tags[0]
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  useEffect(() => {
    setSearchResult(details);
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    setSearchField(searchInput);
    
    fetch(`http://localhost:5000/nameSearch/${searchInput}`).then(
      response => response.json()
    ).then(
      data => {
        setSearchResult(data["movies"])
        //console.log(data);
      }
    )
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredMovies={searchResult} />
      </Scroll>
    );
  }


  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Search a movie</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Movie, genre, keywords" 
          onChange = {handleChange}
        />
        <button onClick={handleClick}>Search</button>
      </div>
      {searchList()}
    </section>
  );
}

export default Search;
