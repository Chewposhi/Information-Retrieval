import React, { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

function SearchBar() {
  // mode selector: 0 -> normal search, 1 -> desc2movie
  const [mode, setMode] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);

  // values from autoComplete function
  const [autoComplete, setAutoComplete] = useState([]);;

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


  // Basic search
  const handleClick = async e => {
      if(searchInput.length == 0){
        alert('Please enter something');
        return;
      }
      if(mode === 0){
        window.open(`/search/${mode}/${searchInput}`)
      }else{
        window.open(`/search/${mode}/${searchInput}`)
      }
      
  };

  // handle enter key down search
  const handleKeyDownSearch = event => {
    if (event.key === 'Enter') {
      handleClick(event);
      setShowSuggest(false);
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
      <div className='flex'>
        <div className='absoulute left-0'>
          <ToggleSwitch label="desc2Movie" mode={mode} setMode={setMode} />
        </div>
        <input 
          type="text" 
          placeholder={mode===0? "Search title" : "Enter Description"}
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
