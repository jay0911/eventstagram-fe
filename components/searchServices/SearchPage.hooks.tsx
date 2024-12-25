import { useServices, useServiceStatistics } from './queries/queries';
import { useState, useEffect } from 'react';


export const useSearchPage = () => {


    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
    const [sortOption, setSortOption] = useState<{ value: string; label: string } | null>(null);
    const { data, isLoading, error } = useServices(nameSearch, currentPage, sortOption?.value.split(',')[0], sortOption?.value.split(',')[1] as 'asc' | 'desc', selectedPriceRange?.min, selectedPriceRange?.max);
    const { data: statistics, isLoading: statisticsLoading } = useServiceStatistics();


    const handleSearch = (name: string) => {
        setNameSearch(name);
    };

    const onSearchClose = () => {
        setIsSearchModalOpen(false)
    }

    const onSortClose = () => {
        setIsSortModalOpen(false)
    }

    const onClearAllClick = () => {
        setNameSearch('')
        setSortOption(null)
        setSelectedPriceRange(null)
        setCurrentPage(0)
    }

    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

    const handlePriceRangeApply = (range: { min: number; max: number }) => {
        setSelectedPriceRange(range)
    };

    const handleApplySort = (selectedOption: { value: string; label: string }) => {
        setSortOption(selectedOption);
    };

    const useScrollDirection = () => {
        const [scrollDirection, setScrollDirection] = useState("up");
        const [prevOffset, setPrevOffset] = useState(0);

        useEffect(() => {
            const toggleScrollDirection = () => {
                const currentOffset = window.pageYOffset;
                const direction = currentOffset > prevOffset ? "down" : "up";

                if (direction !== scrollDirection && (currentOffset - prevOffset > 10 || currentOffset - prevOffset < -10)) {
                    setScrollDirection(direction);
                }
                setPrevOffset(currentOffset);
            };

            window.addEventListener("scroll", toggleScrollDirection);
            return () => window.removeEventListener("scroll", toggleScrollDirection);
        }, [scrollDirection, prevOffset]);

        return scrollDirection;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page - 1); // Convert to 0-based indexing for API
        window.scrollTo(0, 0);
    };


    return {
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSortModalOpen,
        setIsSortModalOpen,
        isPriceModalOpen,
        setIsPriceModalOpen,
        nameSearch,
        setNameSearch,
        currentPage,
        setCurrentPage,
        selectedPriceRange,
        setSelectedPriceRange,
        sortOption,
        setSortOption,
        data,
        isLoading,
        error,
        statistics,
        statisticsLoading,
        handleSearch,
        onSearchClose,
        onSortClose,
        onClearAllClick,
        handlePriceRangeApply,
        handleApplySort,
        useScrollDirection,
        handlePageChange,
    }
}

export default useSearchPage;