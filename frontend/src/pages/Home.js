import React from 'react';
import Carousel from '../components/Carousel';
import Search from '../components/Search';
import MoviesRCM from '../components/MoviesRCM';

const  Home =({ movies }) => {
  return (
    <div>
        <Carousel />
        {/* {movies && <Search movies={movies}/>} */}
        {movies && <MoviesRCM movies={movies}/>}
        {!movies && <p>please connect to solr server</p>}
    </div>
  )
}

export default Home;