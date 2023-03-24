// src/components/SearchList.js

import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card';
import { genres } from '../utils/genres';

function SearchList({ filteredMovies }) {
  const [genreFilter, setGenreFilter] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(genres.length).fill(false)
  );

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

  const handleBoxChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }

  const genreFiltered = filteredMovies.filter(
    movie => {
      let intersect = genreFilter.filter(x => movie.movie_tags[0].includes(x));
      return (
        intersect.length === genreFilter.length || genreFilter.length === 0
      );
    }
  );
  const filtered = genreFiltered.map(movie =>  <Card key={movie["id"]} movie={movie} />);
   
  return (
    <div>
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
      {filtered}
    </div>
  );
}

export default SearchList;