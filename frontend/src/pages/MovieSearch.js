import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Card from '../components/Card';
import { genres } from '../constants/constants';
import { styles } from '../styles';

const MoviesSearch = () => {
    // basic search, fuzzy search
    const {search} = useParams();
    const [fuzzyN, setfuzzyN] = useState(3);

    // show more and less
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [noResultInput, setNoResultInput] = useState("");
    const [noResult, setNoResult] = useState(false);
    const [noResultTag, setNoResultTag] = useState(false);

    // search time
    const [searchTime, setSearchTime] = useState(null);
    var basicStart = 0;
    var basicEnd = 0;
    var fuzzyStart = 0;
    var fuzzyEnd = 0;

    useEffect(() => {
        handleClick();
      }, [search]);

    // Basic search
    const handleClick = async e => {
        if(search.length == 0){
        alert('Please enter something');
        return;
        }
        basicStart = performance.now();
        await fetch(`http://localhost:5000/nameSearch/${search}`).then(
        response => response.json()
        ).then(
            data => {
                console.log(data["movies"])
                if(data["movies"].length === 0){
                    setNoResult(true);
                    setNoResultTag(true);
                    setNoResultInput(search);
                    fuzzy();
                  }else{
                    setMovies(data["movies"]);
                    basicEnd = performance.now();
                    setSearchTime(basicEnd - basicStart);
                    setNoResultTag(false)
                }
            }
        )
    };

    // fuzzy search
    const fuzzy = async e => {
        fuzzyStart = performance.now()
        fetch('http://localhost:5000/Fuzzy', {headers: {'searchText':search, 'n':fuzzyN}}).then(
            response => response.json()
        ).then(
            data => {
                setMovies(data["movies"]);
                fuzzyEnd = performance.now();
                setSearchTime(fuzzyEnd - fuzzyStart);
                setNoResult(false);
            }
        )
    }

    // handle more/less fuzzy
    useEffect(() => {
        if(fuzzyN<1){
        alert('Wow! that is too conservative.');
        setfuzzyN(3);
        return;
        }
        if(fuzzyN>10){
        alert('Wow! that is too wild.');
        setfuzzyN(3);
        return;
        }
        if(fuzzyN !=3){
        fetch('http://localhost:5000/Fuzzy', {headers: {'searchText':search, 'n':fuzzyN}}).then(
            response => response.json()
        ).then(
            data => {
            setMovies(data["movies"])
            setNoResult(false);
            }
        )
        }
    }, [fuzzyN]);

    const [movies, setMovies] = useState([]);
    const isMoreMovies = false;
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
            {noResultTag && 
                <div className='flex flex-col items-center gap-2'>
                    {searchTime && <div style={{color:'white', marginTop:'5px'}}>Search Took: {searchTime} ms</div>}
                    <h2>no result for "{noResultInput}", showing our best guesses!</h2>
                    <div className='flex justify-center'>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4' onClick={() => { setfuzzyN(fuzzyN + 1) }}>Show More</button>
                        <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={() => { setfuzzyN(fuzzyN - 1) }}>Show Less</button>
                    </div>
                    <p>level of guess freedom:{fuzzyN}</p>
                </div>
            }
            <div className='flex flex-wrap justify-center gap-5'>
            {moviesToDisplay.map((movie) => (
                <Card key={movie.id} movie={movie} isMore={false}/>
            ))}
            </div>
        </div>
        </div>
    );
};

export default MoviesSearch;
