import React from 'react';
import Card from '../components/Card';
import Search from '../components/Search';

const MoviesSearch = ({ movies }) => {
  console.log(movies);
  return (
    <div>
      {movies.length}
      {/* filter */}

      {/* sorter */}

      {/* search results */}
      <div className='flex flex-col'>
        {movies.map((movie) => (
          <Card movie={movie} isMore={false}/>
        ))}
      </div>
    </div>
  );
};

export default MoviesSearch;
