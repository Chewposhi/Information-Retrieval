// src/App.js

import React from 'react';
import Search from './components/Search';
import MOCK_DATA from './Data/MOCK_DATA';

function App() {
  return (
    <div className="tc bg-green ma0 pa4 min-vh-100">
      <Search details={MOCK_DATA}/>
    </div>
  );
}

export default App;