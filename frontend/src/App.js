// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import Search from './components/Search';
import MOCK_DATA from './Data/MOCK_DATA';

function App() {
  return (
    <Router>
      <div className="tc bg-green ma0 pa4 min-vh-100">
        <Switch>
          <Route exact path="/">
            <Search details={MOCK_DATA}/>
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