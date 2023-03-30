// src/components/SearchList.js

import React from 'react';
import { useEffect, useState } from 'react';
import Card from './Card';
import { genres } from '../utils/genres';
import { sorter } from '../utils/sorter';

function SearchList({ filteredMovies, checkedState }) {
  const [genreFilter, setGenreFilter] = useState([]);
  const [sorter, setSorter] = useState(()=>function (a,b){
    return b.movie_year-a.movie_year
  });
  

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

  // handleSort
  const handleSort = () => {
    setSorter(()=>function (a,b){
      return a.movie_year-b.movie_year
    })
  }

  // function for filtering 
  const genreFiltered = filteredMovies.filter(
    movie => {
      let intersect = genreFilter.filter(x => movie.movie_tags[0].includes(x));
      return (
        intersect.length === genreFilter.length || genreFilter.length === 0
      );
    }
  );

  genreFiltered.sort(sorter)

  const filtered = genreFiltered.map(movie =>  <Card key={movie["id"]} movie={movie} isMore={false}/>);
   
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;