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

  useEffect(() => {
    fetch("http://localhost:5000/init").then(
      response => response.json()
    ).then(
      data => {
        setMovies(data["movies"])
      }
    )
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="tc pa4 min-vh-100 bg-black">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home movies={movies} />
          </Route>
          <Route path="/movie/:id">
            <MovieDetails/>
          </Route>
          <Route path="/search/:mode?/:search">
            <MoviesSearch />
          </Route>
        </Switch>
        {/* Back to Top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Back to Top
        </button>
      </div>
    </Router>
    
  );
}

export default App;