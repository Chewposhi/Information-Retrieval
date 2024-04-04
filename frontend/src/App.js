// src/App.js

import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './index.css';
import MoviesSearch from './pages/MovieSearch';


function App() {

  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/init").then(
      response => response.json()
    ).then(
      data => {
        setMovies(data["movies"])
      }
    )
  }, [])

  return (
    <Router>
      <div className="tc pa4 min-vh-100 bg-black">
        <Navbar setSearch={setSearch} setShowSearchResult={setShowSearchResult} setMovies={setMovies} />
        <Switch>
          <Route exact path="/">
            <Home isMoreMovies={false} movies={movies} search={search} showSearchResult={showSearchResult} setShowSearchResult={setShowSearchResult}/>
          </Route>
          <Route path="/movie/:id">
            <MovieDetails/>
          </Route>
          <Route path="/more-movies/:genre">
            <Home isMoreMovies={true} movies={movies} search={search} showSearchResult={true} setShowSearchResult={setShowSearchResult}/>
          </Route>
          <Route path="/search/:search">
            <MoviesSearch />
          </Route>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;