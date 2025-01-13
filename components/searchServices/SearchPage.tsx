import React from 'react';
import SearchBar from './searchBar/SearchBar';
import SearchResultCard from './searchResultCard/SearchResultCard';
import FullScreenSearchModal from './modals/searchServiceModal/SeachServiceModal';
import FullScreenSortModal from './modals/sortSearchServiceModal/FullScreenSortModal';
import FullScreenPriceRangeModal from './modals/priceRangeSearchServiceModal/PriceRangeModal';
import Pagination from './pagination/Pagination';
import { useSearchPage } from './SearchPage.hooks';

import ServiceDetails from './serviceDetail/ServiceDetails';
import { useLike } from 'hooks/useLike';

const SearchPage: React.FC = () => {

  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    isSortModalOpen,
    setIsSortModalOpen,
    nameSearch,
    handleSearch,
    onSearchClose,
    onSortClose,
    onClearAllClick,
    handlePriceRangeApply,
    handleApplySort,
    handlePageChange,
    isLoading,
    error,
    statistics,
    statisticsLoading,
    selectedPriceRange,
    sortOption,
    data,
    isPriceModalOpen,
    setIsPriceModalOpen,
    useScrollDirection,
    availableLocation,
    selectedService,
    handleServiceClick,
    handleBack,
  } = useSearchPage();

  const scrollDirection = useScrollDirection();


  if (isLoading) return <p>Loading services...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  if (selectedService) {
    console.log('selectedService', selectedService);
    return (
      <ServiceDetails
        id={selectedService.id}
        title={selectedService.name}
        images={selectedService.images.map((image) => image.resourceUrl)}
        minPrice={0}
        description={selectedService.description}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`fixed top-[53px] sm:top-[50px] md:top-[64px] left-0 right-0 z-50 transition-transform duration-300 bg-white ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      } px-3 md:pl-10 md:pr-10 lg:pl-20 lg:pr-20`}>
        <SearchBar 
          statisticsLoading={statisticsLoading}
          onSearchClick={() => setIsSearchModalOpen(true)} 
          onSortClick={() => setIsSortModalOpen(true)} 
          onPriceClick={() => setIsPriceModalOpen(true)}
          onClearAllClick={onClearAllClick} 
          searchName={nameSearch} 
          availableLocation={availableLocation}
          sortOption={sortOption?.label} 
          selectedPriceRange={selectedPriceRange}
        />
      </div>
      <div className="flex-grow p-4 mt-[128px] px-3 md:pl-10 md:pr-10 lg:pl-20 lg:pr-20"> {/* Adjusted margin-top to account for both header and SearchBar */}
        {data?.content.map((result, index) => (
          <SearchResultCard 
            onClick={() => handleServiceClick(result)} 
            key={index} 
            title={result.name} 
            description={result.description} 
            imageUrl={result.thumbnail?.resourceUrl} 
            minPrice={result?.priceMin}
            serviceId={result.id}
          />
        ))}
      </div>
      {/* Add Pagination component */}
      {data && data.totalElements > 0 && (
        <Pagination
            currentPage={data.number + 1} // Convert to 1-based indexing for display
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
      )}
      <FullScreenSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => onSearchClose()}
        onSearch={handleSearch}
      />
      <FullScreenSortModal
        isOpen={isSortModalOpen}
        onClose={() => onSortClose()}
        onApply={handleApplySort}
      />

      <FullScreenPriceRangeModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onApply={({ min, max }) => {
          handlePriceRangeApply({min, max})
        }}
        priceDistribution={statistics?.medianPrices}
        minPrice={statistics?.priceRange.minPrice}
        maxPrice={statistics?.priceRange.maxPrice}
      />  
    </div>
  );
};

export default SearchPage;
