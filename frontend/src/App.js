// src/App.js

import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';


function App() {

  const [movies, setMovies] = useState(null);

  //fetching of movies
  /*useEffect(() => {
    fetch('http://localhost:8000/movies')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setDetails(data);
      })
  }, [])*/

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
      <div className="tc ma0 pa4 min-vh-100" style={{background:'rgb(42, 59, 88)'}}>
        <Switch>
          <Route exact path="/">
            {movies && <Search movies={movies}/>}
            {!movies && <p>please connect to solr server</p>}
          </Route>
          <Route path="/movie/:id">
            <MovieDetails/>
          </Route>
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;