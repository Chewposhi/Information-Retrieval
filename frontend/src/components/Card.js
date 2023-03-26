// src/components/Card.js

import React from 'react';
import { Link } from 'react-router-dom';

function Card({movie, isMore}) {
  return(
    <Link to={`/movie/${movie.id}` } target="_blank">
      <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5" style={{borderStyle:isMore? 'solid' : 'none'}}>
        <img className="br-100 h3 w3 dib" alt="poster" src={movie.poster_url} />
        <div>
          <h1>{movie.movie_name}</h1>
          {!isMore && <h2>genre: {movie.movie_tags}</h2>}
          {!isMore && <p>description: {movie.movie_dis}</p>}
        </div>
      </div>
    </Link>
    
  );
}

export default Card;