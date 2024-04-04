import React, { useState } from 'react';
import Carousel from '../components/Carousel';
import Search from '../components/Search';
import MoviesSearch from './MoviesSearch';
import MoviesRCM from '../components/MoviesRCM';

const Home = ({ movies, search, showSearchResult }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Carousel />
      {/* {movies && <Search movies={movies}/>} */}
      {!showSearchResult && movies && <MoviesRCM movies={movies} />}
      {showSearchResult && <MoviesSearch movies={search} />}
      {!movies && <p>please connect to solr server</p>}
      
      {/* Back to Top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Back to Top
      </button>
    </div>
  );
};

export default Home;
