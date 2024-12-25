export interface SearchBarProps {
    onSearchClick: () => void;
    onSortClick: () => void;
    onClearAllClick: () => void;
    searchName: string;
    sortOption: string;
    onPriceClick: () => void;
    statisticsLoading: boolean;
    selectedPriceRange: { min: number; max: number } | null;
  }