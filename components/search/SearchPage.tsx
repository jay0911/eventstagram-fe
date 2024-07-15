import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResultCard from './SearchResultCard';
import FullScreenModal from './FullScreenModal';

const SearchPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<{ title: string; description: string; }[]>([]);

  const handleSearch = (name: string, tags: string[]) => {
    // Mock search results
    const results = [
      { title: `Result for ${name}`, description: `Tags: ${tags.join(', ')}` }
    ];
    setSearchResults(results);
  };

  const onClose = () => {
    console.log('hahhahhahah')
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SearchBar onSearchClick={() => setIsModalOpen(true)} />
      <div className="flex-grow p-4">
        {searchResults.map((result, index) => (
          <SearchResultCard key={index} title={result.title} description={result.description} />
        ))}
      </div>
      <FullScreenModal
        isOpen={isModalOpen}
        onClose={() => onClose()}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchPage;
