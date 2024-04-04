import React,  {createRef, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from './Card';
import { genres } from '../constants/constants';

const MoviesRCM = ({ movies }) => {

    const elementsRef = useRef(genres.map(() => createRef()));

    const scroll = (ref, scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
        console.log(ref.current.scrollLeft);
        console.log(ref.current);
      };

    return (
        <div className='flex flex-col gap-10 mt-10 justify-start'>
            {genres.map((genre, index) => (
                <div className="flex flex-col gap-2">
                    <div className='flex justify-around'>
                        <button onClick={() => scroll(elementsRef.current[index], -80)} className="mr-2">
                            <FaChevronLeft /> {/* Icon for scrolling left */}
                        </button>
                        <h2 className="mr-2">{genre}</h2>
                        <button onClick={() => scroll(elementsRef.current[index], +80)}>
                            <FaChevronRight /> {/* Icon for scrolling right */}
                        </button>
                    </div>
                    <div className='flex gap-4 overflow-x-scroll' ref={elementsRef.current[index]} style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', 'overflow-y': 'hidden' }}>
                        {movies.map((movie, idx) => (
                            <div key={idx}>
                                {movie.movie_tags[0].includes(genre) && <Card movie={movie} isMore={false}/>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        
        // <div className='flex flex-col gap-10 mt-10 justify-start'>
        //     {genres.map((genre, index) => (
        //         <div key={index} className='relative'>
        //             <h2>{genre}</h2>
        //             <button className="" onClick={() => scroll(-80)}>Scroll Right</button>
        //             <div className='flex gap-4 overflow-x-scroll' ref={containerRef} style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', 'overflow-y': 'hidden' }}>
                        
        //                 {movies.map((movie, idx) => (
        //                     <div key={idx}>
        //                         {movie["movie_tags"][0].includes(genre) && <Card movie={movie} isMore={false}/>}
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     ))}
        // </div>
    );
};

export default MoviesRCM;
