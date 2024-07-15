import React, { useState } from 'react';

interface SearchBarProps {
  onSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchClick }) => {
  return (
    <div className="p-4 bg-white shadow-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded"
        onClick={onSearchClick}
      />
    </div>
  );
};

export default SearchBar;