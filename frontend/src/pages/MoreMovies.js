import React, { useState } from 'react';
import { useParams } from 'react-router';
import Card from '../components/Card';
import { genres } from '../constants/constants';
import { styles } from '../styles';

const MoreMovies = ({ movies, isMoreMovies }) => {
  const {genre} = useParams();
  const [selectedGenres, setSelectedGenres] = useState(isMoreMovies? [genre] : []);
  const [sortCriteria, setSortCriteria] = useState(null);

  const handleFilter = (genre) => {
    const updatedSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedSelectedGenres);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedMovies = () => {
    if (sortCriteria === 'yearAsc') {
      return [...filteredMovies].sort((a, b) => a.movie_year - b.movie_year);
    } else if (sortCriteria === 'yearDesc') {
      return [...filteredMovies].sort((a, b) => b.movie_year - a.movie_year);
    } else if (sortCriteria === 'ratingAsc') {
      return [...filteredMovies].sort((a, b) => a.movie_star - b.movie_star);
    } else if (sortCriteria === 'ratingDesc') {
      return [...filteredMovies].sort((a, b) => b.movie_star - a.movie_star);
    } else {
      return [...filteredMovies];
    }
  };

  const filteredMovies = selectedGenres.length === 0
    ? movies
    : movies.filter(movie => selectedGenres.some(genre => movie.movie_tags[0].includes(genre)));

  const moviesToDisplay = sortCriteria ? sortedMovies() : filteredMovies;

  return (
    <div className='mt-6'>
      <h2 className={`${styles.heroSubText} my-6`}>Search Result: {moviesToDisplay.length}</h2>
      {/* filter */}
      <h2 className={`${styles.sectionSubText} pink-text-gradient`}>Filter</h2>
      <div className='flex flex-wrap justify-between px-10 divide-x-2 divide-cyan-400'>
        {genres.map(genre => (
          <label key={genre} className='text-white mb-4 px-2'>
            {genre}
            <input
              type='checkbox'
              checked={selectedGenres.includes(genre)}
              onChange={() => handleFilter(genre)}
              className='ml-2'
            />
          </label>
        ))}
      </div>
      {/* sorter */}
      <h2 className={`${styles.sectionSubText} pink-text-gradient`}>Sort by:</h2>
      <select className='px-4 py-2 mb-4' onChange={(e) => handleSort(e.target.value)}>
        <option value=''>-- Select sorting criteria --</option>
        <option value='yearAsc'>Year (Ascending)</option>
        <option value='yearDesc'>Year (Descending)</option>
        <option value='ratingAsc'>Rating (Ascending)</option>
        <option value='ratingDesc'>Rating (Descending)</option>
      </select>
      {/* search results */}
      <div className='max-w-screen-xxl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap justify-center gap-5'>
          {moviesToDisplay.map((movie) => (
            <Card key={movie.id} movie={movie} isMore={false}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreMovies;
