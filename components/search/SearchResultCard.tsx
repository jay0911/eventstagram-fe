import React from 'react';

interface SearchResultCardProps {
  title: string;
  description: string;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ title, description }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default SearchResultCard;
