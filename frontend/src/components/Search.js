// src/components/Search.js

//to-do: add useEffect Cleanup after fetch function implemented
import React, { useEffect, useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
import { genres } from '../utils/genres';
import { sorter } from '../utils/sorter';
import '../Styles/search.css'

function Search({movies}) {

  const [searchInput, setSearchInput] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [noResultInput, setNoResultInput] = useState("");
  const [searchResult, setSearchResult] = useState([{}]);
  const [noResult, setNoResult] = useState(false);
  const [noResultTag, setNoResultTag] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(genres.length).fill(false)
  );
  const [keywords, setKeywords] = useState([]);
  const [desc, setDesc] = useState('');
  const [autoComplete, setAutoComplete] = useState([]);
  const [sortValue, setSortValue] = useState("movie/show year descending");
  const [searchTime, setSearchTime] = useState(null);

  // use effect for initial page mount
  useEffect(() => {
    setSearchResult(movies);
  }, []);

  // search box input change handle
  const handleChange = async e => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setShowSuggest(true);
  };

  // keyword box input change handle
  const handleKeywordsChange = async e => {
    e.preventDefault();
    setKeywordInput(e.target.value);
  };

  // when checkboxes are changed
  const handleBoxChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  // handle sorting selector
  const handleSort = (event) => {
    setSortValue(event.target.value);
  };

  // Output search list of movies
  function searchList() {
    return (
      <Scroll height={'100vh'}>
        <SearchList filteredMovies={searchResult} checkedState={checkedState} sortValue={sortValue} />
      </Scroll>
    );
  };

  // Basic search
  const handleClick = e => {
    const start = performance.now();
    e.preventDefault();
    setShowSuggest(false);

    
    fetch(`http://localhost:5000/nameSearch/${searchInput}`).then(
      response => response.json()
    ).then(
      data => {
        const end = performance.now();
        setSearchTime(end - start);
        setSearchResult(data["movies"])
        if(data["movies"].length === 0){
          setNoResult(true);
          setNoResultTag(true);
          setNoResultInput(searchInput);
        }else{setNoResult(false)
              setNoResultTag(false)}
      }
    )
  };

  // Keywords search
  const handleKeywordsSearch = e => {
    const start = performance.now();
    e.preventDefault();

    console.log(keywords);

    fetch('http://localhost:5000/Keywords', {headers: {'keywords':keywords}}).then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
      }
    );
  };

  // keyword add
  const handleKeywordsAdd = e => {
    e.preventDefault();
    setKeywords(oldKeywords => [...oldKeywords, keywordInput]);
    setDesc(keywordInput);
    setKeywordInput('');
  };

  // handle enter key down search
  const handleKeyDownSearch = event => {
    if (event.key === 'Enter') {
      handleClick(event);
      setShowSuggest(false);
    }
  }

  // handle enter key down keyword Add
  const handleKeyDownKeywords = event => {
    if (event.key === 'Enter') {
      handleKeywordsAdd(event);
    }
  }

  // onAutoComplete
  const onAutoComplete = (term) => {
    setSearchInput(term);
    setShowSuggest(false);
  };

  // handleFocus
  const handleFocus = () => {
    if(searchInput.length === 0){
      setShowSuggest(false)
    }
    else{
      setShowSuggest(true)
    }
    
  };

  
  // fuzzy search
  useEffect(() => {
    if(noResult){
      fetch(`http://localhost:5000/Fuzzy/${searchInput}`).then(
        response => response.json()
      ).then(
        data => {
          setSearchResult(data["movies"])
          setNoResult(false)
        }
      )
    }
  }, [noResult]);

  // Suggester
  useEffect(() => {
    if(searchInput.length < 4){
      return;
    }
    fetch(`http://localhost:5000/AutoComplete/${searchInput}`).then(
      response => response.json()
    ).then(
      data => {
        setAutoComplete(data[searchInput].suggestions);
      }
    )
  }, [searchInput]);


  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow" onClick={()=>window.location.reload()}>
        <img style={{width:'1000px'}} src={require('../Image/lightning-movie-streaming-service-high-resolution-color-logo.png')} />
        <h2 className="f2" style={{cursor:'pointer', color:'white'}}>Search a movie or TV show</h2>
      </div>
      <div className="pa2">
        <div>
          <input 
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type = "text" 
            placeholder = "Search Movie or Show Titles " 
            onChange = {handleChange}
            value = {searchInput}
            onFocus = {() => handleFocus()}
            onKeyDown={handleKeyDownSearch}
          />
          <button style={{cursor:'pointer'}} onClick={handleClick}>Search</button>
          <h2 className="f2" style={{color:'yellow'}}>OR</h2>
          <h2 style={{color:'yellow'}}>Try our beta function!</h2>
          <h3 style={{color:'yellow'}}>Describe a movie you want to watch, provide 5 keywords, eg. cat, dog, adventure</h3>
          <div style={{display:'flex', justifyContent:'center'}}>
            <h3 style={{color:'yellow', paddingRight:'5px'}}>Keywords entered:</h3>
            {keywords.map((keyword) => (
              <h3 style={{paddingRight:'5px', color:'white'}}>{keyword}</h3>
            ))}
          </div>
          <button style={{cursor:'pointer'}} onClick={handleKeywordsAdd}>Add</button>
          <input 
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type = "text" 
            placeholder = "Enter keyword" 
            onChange = {handleKeywordsChange}
            value = {keywordInput}
            onKeyDown={handleKeyDownKeywords}
          />
          <button style={{cursor:'pointer'}} onClick={handleKeywordsSearch}>Search using keywords</button>

        </div>
        {showSuggest && <div className='dropdown'>
          {autoComplete.map((item) => (<div style={{color:'white'}} onClick={()=>onAutoComplete(item.term)} className='dropdown-row'>{item.term}</div>))}
        </div>}
      </div>
      <div style={{paddingTop:'20px', display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
        {genres.map(({ genre }, index) => {
          return (
                  <div style={{display:'flex', flexDirection:'row', padding:'5px'}}>
                    <p style={{color:'white'}}>{genre}</p>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={genre}
                      value={genre}
                      checked={checkedState[index]}
                      onChange={() => handleBoxChecked(index)}
                    />
                  </div>
                  
          );
          })}
      </div>
      <div>
        <label style={{color:'white'}}>
          Sort By: 
          <select value={sortValue} onChange={handleSort}>
            {sorter.map((sorter) => (
              <option value={sorter.sort}>{sorter.sort}</option>
            ))}
          </select>
        </label>
        {searchTime && <div style={{color:'white'}}>Search Took: {searchTime} ms</div>}
      </div>
      {noResultTag && <h2 style={{color:'white'}}>no result for "{noResultInput}", showing our best guesses!</h2>}
      {searchList()}
    </section>
  );
}

export default Search;
