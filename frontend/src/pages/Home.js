import React from 'react';
import Carousel from '../components/Carousel';
import MoviesRCM from '../components/MoviesRCM';

const Home = ({ movies }) => {
  return (
    <div>
      <Carousel />
      { movies && <MoviesRCM movies={movies} />}
      {!movies && <p>please connect to solr server</p>}
    </div>
  );
};

export default Home;
