import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { SearchResultCardProps } from './SearchResultCard.types';
const SearchResultCard: React.FC<SearchResultCardProps> = ({
  title,
  description,
  imageUrl,
  minPrice,
}) => {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="flex-shrink-0 relative w-[45%] h-64">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 left-4 text-white">
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 max-w-2xl w-[55%]">
        <div className="p-3 sm:p-6 flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-red-600 truncate">{title}</h2>
          <p className="text-sm sm:text-base text-gray-600 overflow-hidden display-webkit-box webkit-line-clamp-3 webkit-box-orient-vertical">{description}</p>
        </div>
        
        <div className="flex h-20 sm:h-24">
          <div className="flex-1 p-3 sm:p-6">
            <div className="text-[0.8rem] sm:text-lg">Start at</div>
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-red-600">${minPrice.toLocaleString()}</span>
              <span className="text-xs sm:text-base text-gray-600">per service</span>
            </div>
          </div>

          <div className="p-3 sm:p-6 flex items-center">
            <button className="bg-red-600 text-white text-sm sm:text-base px-3 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-700">
              See more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;