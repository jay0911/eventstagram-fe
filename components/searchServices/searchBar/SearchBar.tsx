import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { SearchBarProps } from "./SearchBar.types";
import { useSearchBar } from "./SearchBar.hooks";

const SearchBar: React.FC<SearchBarProps> = ({ selectedPriceRange, statisticsLoading, onSearchClick, onSortClick, onClearAllClick, searchName, sortOption, onPriceClick, availableLocation }) => {
  // Format the placeholder text based on searchName and availableLocation
  const { getPlaceholderText } = useSearchBar(searchName, availableLocation);

  return (
    <div className="p-4 bg-gray">
      {/* Search Input */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder={typeof getPlaceholderText() === 'string' ? getPlaceholderText() as string : 'Click to Search'}
          value={searchName ? `${searchName}${availableLocation ? `, ${availableLocation}` : ''}` : ''}
          className="w-full p-4 pl-6 border border-gray-300 rounded-full focus:outline-blue-500 placeholder-gray-500 placeholder:text-sm"
          onClick={onSearchClick}
          readOnly
        />
      </div>

      {/* Filters Section */}
      <div className="mt-4 overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-max gap-4 min-w-max">
          {/* Clear All Button */}
          <button className="min-w-[120px] px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-center hover:bg-gray-100" onClick={onClearAllClick}>
            <span className="whitespace-nowrap">Clear all</span>
          </button>

          {/* Sort Button */}
          <button className="min-w-[120px] px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-center space-x-2 hover:bg-gray-100" onClick={onSortClick}>
            <FontAwesomeIcon icon={faSort} className="text-gray-500 shrink-0" />
            <span className="whitespace-nowrap text-sm">{sortOption ? sortOption : 'Sort'}</span>
          </button>

          {/* Price Button */}
          <button 
            disabled={statisticsLoading} 
            className="min-w-[120px] px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center justify-center space-x-2 hover:bg-gray-100" 
            onClick={onPriceClick}
          >
            <FontAwesomeIcon icon={faMoneyBill} className="text-gray-500 shrink-0" />
            <span className="whitespace-nowrap text-sm">{selectedPriceRange ? `$${selectedPriceRange.min} - $${selectedPriceRange.max}` : 'Price'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;