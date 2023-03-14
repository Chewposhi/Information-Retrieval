// src/components/Card.js

import React from 'react';
import { Link } from 'react-router-dom';

function Card({movie}) {
  return(
    <Link to={`/movie/${movie.id}`}>
      <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
        <img className="br-100 h3 w3 dib" alt="poster" src={movie.poster_url} />
        <div>
          <h1>{movie.movie_name}</h1>
          <h2>genre: {movie.movie_tags}</h2>
          <p>description: {movie.movie_dis}</p>
        </div>
      </div>
    </Link>
    
  );
}

export default Card;