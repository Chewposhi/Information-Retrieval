// src/components/Search.js

//to-do: add useEffect Cleanup after fetch function implemented

import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { genres } from '../utils/genres';

function Search({movies}) {

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([{}]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(genres.length).fill(false)
  );

  const genreFiltered = movies.filter(
    movie => {
      let intersect = genreFilter.filter(x => movie.movie_tags[0].includes(x));
      return (
        intersect.length === genreFilter.length || genreFilter.length === 0
      );
    }
  );
  //console.log(genreFiltered);

  // use effect for initial page mount
  useEffect(() => {
    setSearchResult(movies);
  }, []);

  // use effect for genre filter
  useEffect(() => {
    setGenreFilter([]);
    let filter =[];
    checkedState.map( (checked, index)=> {
      if(checked){
        filter.push(genres[index].genre);
      }
    }
    )
    setGenreFilter(filter);
  }, [checkedState]);

  // use effect for genre filter
  useEffect(() => {
    setSearchResult(genreFiltered);
  }, [genreFilter]);

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
    setGenreFilter([]);
    let filter =[];
    checkedState.map( (checked, index)=> {
      if(checked){
        filter.push(genres[index].genre);
      }
    }
    )
    setGenreFilter(filter);
  };

  const handleBoxChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

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

        <div style={{paddingTop:'20px', display:'flex', justifyContent:'center'}}>
          {genres.map(({ genre }, index) => {
          return (
                  <div style={{display:'flex', flexDirection:'row', padding:'5px'}}>
                    <p>{genre}</p>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={genre}
                      value={genre}
                      checked={checkedState[index]}
                      onChange={() => handleBoxChecked(index)}
                    />
                  </div>
                  
          );
        })}
        </div>
        <button style={{cursor:'pointer'}} onClick={handleFilterClick}>filter</button>
        
      </div>
      {searchList()}
    </section>
  );
}

export default Search;
