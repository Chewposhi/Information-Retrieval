// src/components/Card.js

import React from 'react';
import { Link } from 'react-router-dom';

function Card({movie, isMore}) {
  return(
    <Link to={`/movie/${movie.id}` } target="_blank">
      <div className="tc dib br3 pa3 ma2 grow bw2 shadow-5" style={{borderStyle:isMore? 'solid' : 'none', background:'rgb(42, 59, 88)'}}>
        <img className="br-50 h8 w4 dib" alt="poster" src={movie.movie_Poster} />
        <div>
          <h1 style={{color:'white'}}>{movie.movie_name} ({movie.movie_year})</h1>
          {!isMore && <h2 style={{color:'white'}}>Rating: {movie.movie_star}</h2>}
          {!isMore && <h2 style={{color:'white'}}>Genre: {movie.movie_tags}</h2>}
          {!isMore && <p style={{color:'white'}}>description: {movie.movie_dis}</p>}
        </div>
      </div>
    </Link>
    
  );
}

export default Card;