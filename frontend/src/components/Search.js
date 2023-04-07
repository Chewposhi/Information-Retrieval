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
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [noResultInput, setNoResultInput] = useState("");
  const [searchResult, setSearchResult] = useState([{}]);
  const [noResult, setNoResult] = useState(false);
  const [noResultTag, setNoResultTag] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(genres.length).fill(false)
  );
  const [keywords, setKeywords] = useState([]);
  const [parsedDesc, setParsedDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [autoComplete, setAutoComplete] = useState([]);
  const [sortValue, setSortValue] = useState("default");
  const [searchTime, setSearchTime] = useState(null);
  const [fuzzyN, setfuzzyN] = useState(3);
  var basicStart = 0;
  var basicEnd = 0;
  var fuzzyStart = 0;
  var fuzzyEnd = 0;

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
    if(searchInput.length == 0){
      alert('Please enter something');
      return;
    }
    e.preventDefault();
    setShowSuggest(false);

    basicStart = performance.now();
    fetch(`http://localhost:5000/nameSearch/${searchInput}`).then(
      response => response.json()
    ).then(
      data => {
        setSearchResult(data["movies"])
        if(data["movies"].length === 0){
          setNoResult(true);
          setNoResultTag(true);
          setNoResultInput(searchInput);
        }else{setNoResult(false)
              basicEnd = performance.now();
              setSearchTime(basicEnd - basicStart);
              setNoResultTag(false)}
      }
    )
    setfuzzyN(3);
  };

  // Keywords search, parse description first
  const handleKeywordsSearch = e => {
    if(keywords.length == 0){
      alert("No description added! Please add description");
      return;
    }
    e.preventDefault();

    // parse user desc
    fetch('http://localhost:5000/DescrptionParse', {headers: {'description':desc}}).then(
      response => response.json()
    ).then(
      data => {
        setParsedDesc(data);
      }
    );
  };

  // query solr with parsed description
  useEffect(() => {
    if(parsedDesc.length != 0){
      // fetch by tokenised desc
      fetch('http://localhost:5000/Keywords', {headers: {'keywords':parsedDesc}}).then(
        response => response.json()
      ).then(
        data => {
          setSearchResult(data["movies"]);
        }
      );
    }
  }, [parsedDesc]);


  // keyword add
  const handleKeywordsAdd = e => {
    if(keywordInput === ''){
      alert('input is empty');
      return;
    }
    setShowAddBtn(false);
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

  // handle keyword remove
  const handleRemoveKeyword = (keyword) => {
    const x = keywords.filter(function(item) {
      return item != keyword
    });
    setKeywords(x);
    setShowAddBtn(true);
    
  };


  
  // fuzzy search
  useEffect(() => {
    fuzzyStart = performance.now()
    if(noResult){
      fetch('http://localhost:5000/Fuzzy', {headers: {'searchText':searchInput, 'n':fuzzyN}}).then(
        response => response.json()
      ).then(
        data => {
          fuzzyEnd = performance.now();
          console.log(fuzzyEnd);
          console.log(basicStart);
          setSearchTime(fuzzyEnd - fuzzyStart);
          setSearchResult(data["movies"])
          setNoResult(false)
        }
      )
    }
  }, [noResult]);

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
      fetch('http://localhost:5000/Fuzzy', {headers: {'searchText':searchInput, 'n':fuzzyN}}).then(
        response => response.json()
      ).then(
        data => {
          setSearchResult(data["movies"])
          setNoResult(false)
        }
      )
    }
  }, [fuzzyN]);

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
          {showSuggest && <div className='dropdown'>
          {autoComplete.map((item) => (<div style={{color:'white'}} onClick={()=>onAutoComplete(item.term)} className='dropdown-row'>{item.term}</div>))}
        </div>}
          <h2 className="f2" style={{color:'yellow'}}>OR</h2>
          <h2 style={{color:'yellow'}}>Try our beta function: desc2movie</h2>
          <h3 style={{color:'yellow'}}>Describe a movie you want to watch, focus on elements of the movies. eg. "man and girl survive zombie"</h3>
          <h3 style={{color:'red'}}>P.S. refresh the page before you switch between basic search and desc2movie</h3>
          <div style={{display:'flex', justifyContent:'center'}}>
            <h3 style={{color:'yellow', paddingRight:'5px'}}>description entered:</h3>
            {keywords.map((keyword) => (
              <h3 style={{paddingRight:'5px', color:'white', cursor:'pointer'}} onClick={()=>handleRemoveKeyword(keyword)}>{keyword}</h3>
            ))}
          </div>
          {showAddBtn && <button style={{cursor:'pointer'}} onClick={handleKeywordsAdd}>Add</button>}
          <input 
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type = "text" 
            placeholder = "Enter description" 
            onChange = {handleKeywordsChange}
            value = {keywordInput}
            onKeyDown={handleKeyDownKeywords}
          />
          <button style={{cursor:'pointer'}} onClick={handleKeywordsSearch}>convert description to movies</button>

        </div>
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
        {searchTime && <div style={{color:'white', marginTop:'5px'}}>Search Took: {searchTime} ms</div>}
      </div>
      {noResultTag && 
      <div>
        <h2 style={{color:'white'}}>no result for "{noResultInput}", showing our best guesses!</h2>
        <button style={{margin:'5px', cursor:'pointer'}} onClick={()=>{setfuzzyN(fuzzyN+1)}}>make a wilder guesses</button>
        <button style={{margin:'5px', cursor:'pointer'}} onClick={()=>{setfuzzyN(fuzzyN-1)}}>make a more conservative guesses</button>
        <p style={{color:'white'}}>level of guess freedom:{fuzzyN}</p>
        <p style={{color:'white'}}>number of results:{searchResult.length}</p>
      </div>
      }
      {searchList()}
    </section>
  );
}

export default Search;
