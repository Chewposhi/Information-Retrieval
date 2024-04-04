import React, { useState } from 'react';
import Carousel from '../components/Carousel';
import Search from '../components/Search';
import MoviesSearch from './MoviesSearch';
import MoviesRCM from '../components/MoviesRCM';

const  Home =({ movies, search }) => {

  return (
    <div>
        <Carousel />
        {/* {movies && <Search movies={movies}/>} */}
        {movies && <MoviesRCM movies={movies}/>}
        <MoviesSearch movies={search}/>
        {!movies && <p>please connect to solr server</p>}
    </div>
  )
}

export default Home;