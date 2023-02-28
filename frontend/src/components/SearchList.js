// src/components/SearchList.js

import React from 'react';
import Card from './Card';

function SearchList({ filteredMovies }) {

  const filtered = filteredMovies.map(movie =>  <Card key={movie.id} movie={movie} />);
   
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;