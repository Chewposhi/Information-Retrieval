import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { genres } from '../constants/constants';
import { styles } from '../styles';

const MoviesSearch = () => {
    // url params
    const {search} = useParams();
    const {mode} = useParams();

    const [movies, setMovies] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState(mode == 2? [search] : []);
    const [sortCriteria, setSortCriteria] = useState(null);
    const [databaseCount, setDatabaseCount] = useState(0);

    const [loaded, setLoaded] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 40;

    // basic search, fuzzy search

    const [fuzzyN, setfuzzyN] = useState(3);

    // show more and less
    const [noResultInput, setNoResultInput] = useState("");
    const [noResultTag, setNoResultTag] = useState(false);

    // search time
    const [searchTime, setSearchTime] = useState(null);
    var basicStart = 0;
    var basicEnd = 0;
    var fuzzyStart = 0;
    var fuzzyEnd = 0;

    useEffect(() => {
        handleClick();
      }, [search, currentPage]);

    // Basic search
    const handleClick = async e => {
        // mode 0: name search api
        if(mode == 0){
            basicStart = performance.now();
            await fetch(`http://localhost:5000/nameSearch/${search}/${(currentPage-1)*moviesPerPage}/${moviesPerPage*currentPage}`).then(
            response => response.json()
            ).then(
                data => {
                    // if basic search returns no result, try fuzzy
                    if(data["movies"].length === 0){
                        setNoResultTag(true);
                        setNoResultInput(search);
                        fuzzy();
                      }else{
                        setMovies(data["movies"]);
                        setDatabaseCount(data["count"]);
                        setLoaded(true);
                        basicEnd = performance.now();
                        setSearchTime(basicEnd - basicStart);
                        setNoResultTag(false)
                    }
                }
            )
            // mode 1: desc2movie api
        }else if(mode == 1){
            // parse user desc
            fetch('http://localhost:5000/DescrptionParse', {headers: {'description':search}}).then(
                response => response.json()
            ).then(
                data => {
                if(data.length != 0){
                    // fetch by tokenised desc
                    fetch(`http://localhost:5000/Keywords/${(currentPage-1)*moviesPerPage}/${moviesPerPage*currentPage}`, {headers: {'keywords':data}}).then(
                      response => response.json()
                    ).then(
                      data => {
                        setMovies(data["movies"]);
                        setDatabaseCount(data["count"]);
                        setLoaded(true);
                      }
                    );
                  }else{
                    alert("Could not find result");
                  }
                }
            );
            // mode 2: search by genre
        } else if(mode == 2){
            await fetch(`http://localhost:5000/movie-rec/${search}/${(currentPage-1)*moviesPerPage}/${moviesPerPage*currentPage}`).then(
                response => response.json()
                ).then(
                    data => {
                        setMovies(data["movies"]);
                        setDatabaseCount(data["count"]);
                        setLoaded(true);
                        setNoResultTag(false)
                    }
                )
        }else{
            console.log("mode not recognized")
        }
        
    };

    // fuzzy search
    const fuzzy = async e => {
        fuzzyStart = performance.now()
        fetch(`http://localhost:5000/Fuzzy/${(currentPage-1)*moviesPerPage}/${moviesPerPage*currentPage}`, {headers: {'searchText':search, 'n':fuzzyN}}).then(
            response => response.json()
        ).then(
            data => {
                setMovies(data["movies"]);
                setDatabaseCount(data["count"]);
                console.log(data["count"])
                setLoaded(true);
                fuzzyEnd = performance.now();
                setSearchTime(fuzzyEnd - fuzzyStart);
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
            }
        )
        }
    }, [fuzzyN]);

    // handle page change, fetch new movies
    const handlePageChange = page => {
        setCurrentPage(page);
        // You can perform data fetching or any other action here based on the new page number
      };

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
            <h2 className={`${styles.heroSubText} my-6`}>Search Result{mode == 2? (" for "+search +": ")  :":" } {databaseCount}</h2>
            {/* filter */}
            {mode != 2 && <div>
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
            </div>}
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
            {!loaded && <h1 className={`${styles.sectionHeadText}`}>Loading...</h1>}
            {loaded && <div className='max-w-screen-xxl mx-auto px-4 sm:px-6 lg:px-8'>
                {searchTime && <div className='mb-4'>Search Took: {searchTime} ms</div>}
                {noResultTag && search!=="*" && 
                    <div className='flex flex-col items-center gap-2 my-2'>
                        <h2>no result for "{noResultInput}", showing our best guesses!</h2>
                        <div className='flex justify-center'>
                            <button className={`${fuzzyN<9? 'inline' : 'hidden'} bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4 `}onClick={() => { setfuzzyN(fuzzyN + 1) }}>Show More</button>
                            <button className={`${fuzzyN>1? 'inline' : 'hidden'} bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded`} onClick={() => { setfuzzyN(fuzzyN - 1) }}>Show Less</button>
                        </div>
                        <p>level of guess freedom: {fuzzyN}</p>
                    </div>
                }
                <div className='flex flex-wrap justify-center gap-5'>
                {moviesToDisplay.map((movie) => (
                    <Card key={movie.id} movie={movie} isMore={false}/>
                ))}
                </div>
                <Pagination moviesPerPage={moviesPerPage} currentPage={currentPage} onPageChange={handlePageChange} totalPages={databaseCount}/>
            </div>}
        </div>
    );
};

export default MoviesSearch;
