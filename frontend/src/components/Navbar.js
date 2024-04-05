import React from 'react'
import SearchBar from './SearchBar'

const Navbar = ({setSearch, setShowSearchResult, setMovies}) => {
  return (
    <div>
        <nav class="text-white py-4 px-20">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src='/image/logo.png' alt="Logo" class="h-8 mr-6" />
                    
                    <ul class="flex space-x-6 font-bold">
                        <li><a href="/" class="hover:underline">Home</a></li>
                        <li><a href="/search/0/*" class="hover:underline">Movies</a></li>
                        <li><a href="/" class="hover:underline">TV Shows</a></li>
                    </ul>
                </div>
                
                <SearchBar setSearch={setSearch} setShowSearchResult={setShowSearchResult} setMovies={setMovies}/>
            </div>
        </nav>


    </div>
  )
}

export default Navbar
