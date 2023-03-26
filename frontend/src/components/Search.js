// src/components/Search.js

//to-do: add useEffect Cleanup after fetch function implemented

import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { genres } from '../utils/genres';

function Search({movies}) {

  const [searchInput, setSearchInput] = useState("");
  const [noResultInput, setNoResultInput] = useState("");
  const [searchResult, setSearchResult] = useState([{}]);
  const [noResult, setNoResult] = useState(false);
  const [noResultTag, setNoResultTag] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(genres.length).fill(false)
  );

  // use effect for initial page mount
  useEffect(() => {
    setSearchResult(movies);
  }, []);

  // search box input change handle
  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // when checkboxes are changed
  const handleBoxChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

  // Output search list of movies
  function searchList() {
    return (
      <Scroll height={'100vh'}>
        <SearchList filteredMovies={searchResult} checkedState={checkedState} />
      </Scroll>
    );
  };

  // Basic search
  const handleClick = e => {
    e.preventDefault();

    
    fetch(`http://localhost:5000/nameSearch/${searchInput}`).then(
      response => response.json()
    ).then(
      data => {
        setSearchResult(data["movies"])
        if(data["movies"].length === 0){
          setNoResult(true);
          setNoResultTag(true);
          setNoResultInput(searchInput);
        }else{setNoResult(false)
              setNoResultTag(false)}
      }
    )
  };

  
  // fuzzy search
  useEffect(() => {
    if(noResult){
      fetch(`http://localhost:5000/Fuzzy/${searchInput}`).then(
        response => response.json()
      ).then(
        data => {
          setSearchResult(data["movies"])
          setNoResult(false)
        }
      )
    }
  }, [noResult]);


  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2" style={{cursor:'pointer'}} onClick={()=>window.location.reload()}>Search a movie or TV show</h2>
      </div>
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search Movie, genre, keywords" 
          onChange = {handleChange}
        />
        <button style={{cursor:'pointer'}} onClick={handleClick}>Search</button>
      </div>
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
      {noResultTag && <h2>no result for "{noResultInput}", showing our best guesses!</h2>}
      {searchList()}
    </section>
  );
}

export default Search;
