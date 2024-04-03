import React, { useRef } from 'react';
import Card from './Card';
import { genres } from '../constants/constants';

const MoviesRCM = ({ movies }) => {
    const ref = useRef(null);
    const products = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
        console.log(ref.current.scrollLeft);
        console.log(ref.current);
      };

    return (
        <div className="paper">
            <button onClick={() => scroll(-80)}>LEFT</button>
            <button onClick={() => scroll(+80)}>RIGHT</button>
            <div className={'container'}>
                <div>
                <div className='flex gap-4 overflow-x-scroll' ref={ref} style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', 'overflow-y': 'hidden' }}>
                        
                         {movies.map((movie, idx) => (
                             <div key={idx}>
                                 <Card movie={movie} isMore={false}/>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
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
