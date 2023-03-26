// src/components/SearchList.js

import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card';
import { genres } from '../utils/genres';

function SearchList({ filteredMovies, checkedState }) {
  const [genreFilter, setGenreFilter] = useState([]);
  

  // use effect, set filter when checkboxes are touched
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



  // function for filtering 
  const genreFiltered = filteredMovies.filter(
    movie => {
      let intersect = genreFilter.filter(x => movie.movie_tags[0].includes(x));
      return (
        intersect.length === genreFilter.length || genreFilter.length === 0
      );
    }
  );

  const filtered = genreFiltered.map(movie =>  <Card key={movie["id"]} movie={movie} isMore={false}/>);
   
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;