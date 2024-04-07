import React,  {createRef, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from './Card';
import { genres } from '../constants/constants';
import { styles } from '../styles';

const MoviesRCM = () => {
    const [movieData, setMovieData] = useState(null);
    useEffect(() => {
        // Array to store promises of fetch calls
        const fetchPromises = genres.map(genre => {
          return fetch(`http://localhost:5000/movie-rec/${genre}`)
            .then(response => response.json())
            .then(data => ({
              [genre]: data.movies
            }));
        });
    
        // Wait for all fetches to complete
        Promise.all(fetchPromises)
          .then(results => {
            // Combine the results into a single object
            const combinedResults = results.reduce((acc, result) => {
              return { ...acc, ...result };
            }, {});
            // Set the state with the combined results
            setMovieData(combinedResults);
          })
          .catch(error => {
            console.error('Error fetching movies:', error);
          });
      }, []);

    const elementsRef = useRef(genres.map(() => createRef()));

    const scroll = (ref, scrollOffset) => {
        // Get the width of the viewport
        const viewportWidth = window.innerWidth;
    
        // Calculate the scroll distance based on the viewport width
        const calculatedScrollOffset = scrollOffset * (viewportWidth / 100); // Adjust factor as needed
    
        // Scroll the element by the calculated scroll offset
        ref.current.scrollLeft += calculatedScrollOffset;
    
        // console.log(ref.current.scrollLeft);
        // console.log(ref.current);
    };
    

    return (
        <div className='flex flex-col gap-10 mt-10 pt-10 justify-start divide-y-4 divide-cyan-400'>
            <h1 className={`${styles.heroSubText}`}>Recommended For You</h1>
            {genres.map((genre, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className='flex justify-around mt-5 relative'>
                        <button onClick={() => scroll(elementsRef.current[index], -80)} className="mr-2">
                            <FaChevronLeft /> {/* Icon for scrolling left */}
                        </button>
                        <h2 className={`${styles.sectionSubText} mr-2 font-bold pink-text-gradient`}>{genre}</h2>
                        <button onClick={() => scroll(elementsRef.current[index], +80)}>
                            <FaChevronRight /> {/* Icon for scrolling right */}
                        </button>
                        <Link className='absolute right-10' to={`/search/2/${genre}` } target="_blank">
                            <p >more</p>
                        </Link>
                    </div>
                    {movieData && <div className='flex gap-4 overflow-x-scroll' ref={elementsRef.current[index]} style={{ '-ms-overflow-style': 'none', 'scrollbar-width': 'none', 'overflow-y': 'hidden' }}>
                        {movieData[genre].map((movie, idx) => (
                            <div key={idx}>
                                {movie.movie_tags[0].includes(genre) && <Card movie={movie} isMore={false}/>}
                            </div>
                        ))}
                    </div>}
                </div>
            ))}
        </div>
    );
};

export default MoviesRCM;
