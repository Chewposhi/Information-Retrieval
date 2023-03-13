// src/App.js

import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';


function App() {

  const [details, setDetails] = useState(null);

  //fetching of movies
  useEffect(() => {
    fetch('http://localhost:8000/movies')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setDetails(data);
      })
  }, []);

  return (
    <Router>
      <div className="tc bg-green ma0 pa4 min-vh-100">
        <Switch>
          <Route exact path="/">
            {details && <Search details={details}/>}
            {!details && <p>please connect to server</p>}
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