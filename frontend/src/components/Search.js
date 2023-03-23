// src/components/Search.js

//to-do: add useEffect Cleanup after fetch function implemented

import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';

function Search({details}) {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([{}]);
  const [genreFilter, setGenreFilter] = useState(["Action","Drama"]);

  const genreFiltered = details.filter(
    movie => {
      let intersect = genreFilter.filter(x => movie.movie_tags[0].includes(x));
      return (
        intersect.length === genreFilter.length || genreFilter.length === 0
      );
    }
  );
  //console.log(genreFiltered);

  useEffect(() => {
    setSearchResult(details);
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();

    
    fetch(`http://localhost:5000/nameSearch/${searchInput}`).then(
      response => response.json()
    ).then(
      data => {
        setSearchResult(data["movies"])
      }
    )
  };

  const handleFilterClick = e => {
    e.preventDefault();

    setGenreFilter(["Action", "Drama"]);
    setSearchResult(genreFiltered);
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
        <h2 className="f2">Search a movie or TV show</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Movie, genre, keywords" 
          onChange = {handleChange}
        />
        <button style={{cursor:'pointer'}} onClick={handleClick}>Search</button>
        <div style={{paddingTop:'20px'}}>
          <form>
            Action <input style={{marginRight:'10px'}} type="checkbox"/>
            Adventure <input style={{marginRight:'10px'}} type="checkbox"/>  
            Drama <input style={{marginRight:'10px'}} type="checkbox"/>
            Comedy <input style={{marginRight:'10px'}} type="checkbox"/>
            Crime <input style={{marginRight:'10px'}} type="checkbox"/>
            Romance <input style={{marginRight:'10px'}} type="checkbox"/>
          </form>
          <button style={{cursor:'pointer'}} onClick={handleFilterClick}>filter</button>
        </div>
        
      </div>
      {searchList()}
    </section>
  );
}

export default Search;
