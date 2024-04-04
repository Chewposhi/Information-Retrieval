import React, { useEffect, useState } from 'react';
import { genres } from '../utils/genres';
import '../Styles/search.css'

function SearchBar({movies, setSearch, setShowSearchResult, setMovies}) {

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
    if(e.target.value==""){
      setShowSuggest(false);
    }else{
      setShowSuggest(true);
    }
  };

  // keyword box input change handle
  const handleKeywordsChange = async e => {
    e.preventDefault();
    setKeywordInput(e.target.value);
  };


  // Basic search
  const handleClick = async e => {
      window.open(`/search/${searchInput}`)
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
    <div class="relative flex flex-col">
      <div>
        <input 
          type="text" 
          placeholder="Search"
          onChange={handleChange}
          value={searchInput}
          onFocus={() => handleFocus()}
          onKeyDown={handleKeyDownSearch}
          class="w-full bg-gray-900 text-white px-4 py-2 rounded-md focus:outline-none" />
        <button onClick={handleClick} class="absolute right-0 top-0 mt-2 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-gray-300 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l4.5 4.5M10 8a2 2 0 100-4 2 2 0 000 4z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.5-4.5M6 10a6 6 0 1112 0 6 6 0 01-12 0z" />
          </svg>
        </button>
      </div>
      {showSuggest && (
        <div class="absolute left-0 mt-10 w-full z-10">
          {autoComplete.map((item) => (
            <div style={{ color: 'white' }} onClick={() => onAutoComplete(item.term)} class="dropdown-row">
              {item.term}
            </div>
          ))}
        </div>
      )}
    </div>

  );
}

export default SearchBar;
