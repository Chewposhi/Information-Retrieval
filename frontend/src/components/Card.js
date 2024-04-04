// src/components/Card.js

import React from 'react';
import { Link } from 'react-router-dom';

function Card({movie, isMore}) {
  return(
    <Link to={`/movie/${movie.id}` } target="_blank">
        <div className={`green-pink-gradient p-[3px] rounded-[20px] shadow-card flex-col flex gap-2 items-center pb-5 bg-black rounded-[20px] ${isMore ? 'border-solid' : 'border-none'}`} style={{ width: '300px', height: '440px' }}>
          <img className="br-50 h-140 w-70" alt="poster" src={movie.movie_Poster} />
          <div className="h-full flex flex-col justify-between">
            <div>
              <h1 className="text-white mb-2 font-bold">{movie.movie_name} ({movie.movie_year})</h1>
              {!isMore && (
                <div>
                  <h2 className="text-white mb-2">Rating: {movie.movie_star}</h2>
                  <h2 className="text-white">Genre: {movie.movie_tags}</h2>
                </div>
              )}
            </div>
            {!isMore && <div></div>} {/* To maintain fixed size when content is hidden */}
          </div>
      </div>
    </Link>
    
  );
}

export default Card;