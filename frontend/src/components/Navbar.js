import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav class="text-white py-4 px-20">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src='/image/logo.png' alt="Logo" class="h-8 mr-6" />
                    
                    <ul class="flex space-x-6 font-bold">
                        <li><a href="#" class="hover:underline">Home</a></li>
                        <li><a href="#" class="hover:underline">Movies</a></li>
                        <li><a href="#" class="hover:underline">TV Shows</a></li>
                    </ul>
                </div>
                
                <div class="relative">
                    <input type="text" placeholder="Search" class="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none" />
                    <button class="absolute right-0 top-0 mt-2 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 hover:text-gray-300 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l4.5 4.5M10 8a2 2 0 100-4 2 2 0 000 4z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.5-4.5M6 10a6 6 0 1112 0 6 6 0 01-12 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>


    </div>
  )
}

export default Navbar
