import React from 'react';
import { PaginationProps } from './Pagination.types';


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center pb-16 px-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg disabled:border-gray-300 disabled:text-gray-300"
      >
        Previous
      </button>
      
      <div className="text-gray-600 font-medium">
        {currentPage} of {totalPages}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-2 text-blue-500 border border-blue-500 rounded-lg disabled:border-gray-300 disabled:text-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;