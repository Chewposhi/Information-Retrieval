import React from 'react';

const Pagination = ({ moviesPerPage, currentPage, totalPages, onPageChange }) => {
  // Function to handle page change from dropdown
  const handlePageSelect = (e) => {
    const selectedPage = parseInt(e.target.value);
    onPageChange(selectedPage);
  };

  return (
    <nav aria-label="Page navigation" className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
      <ul className="pagination flex space-x-4">
        <li className={`page-item ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}>
          <button
            className="page-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        <li>
          <select
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value={currentPage}
            onChange={handlePageSelect}
          >
            {Array.from({ length: Math.ceil(totalPages/moviesPerPage)}, (_, index) => index + 1).map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </li>
        <li className={`page-item ${currentPage === Math.ceil(totalPages/moviesPerPage) ? 'opacity-50 pointer-events-none' : ''}`}>
          <button
            className="page-link bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalPages/moviesPerPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
