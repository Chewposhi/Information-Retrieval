// src/components/Card.js

import React from 'react';

function Card({movie}) {
  return(
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img className="br-100 h3 w3 dib" alt="poster" src={movie.poster_url} />
      <div>
        <h1>{movie.title}</h1>
        <h2>genre: {movie.genre}</h2>
        <p>description: {movie.description}</p>
      </div>
    </div>
  );
}

export default Card;