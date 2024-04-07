import React from 'react'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <div>
        <nav className="text-white py-4 px-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src='/image/logo.png' alt="Logo" className="h-8 mr-6" />
                    
                    <ul className="flex space-x-6 font-bold">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/search/0/*" className="hover:underline">Movies</a></li>
                        <li><a href="/" className="hover:underline">TV Shows</a></li>
                    </ul>
                </div>
                
                <SearchBar />
            </div>
        </nav>


    </div>
  )
}

export default Navbar
