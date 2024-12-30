import { MedianPrice } from "types/ServiceTypes";

export interface FullScreenPriceRangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (range: { min: number; max: number }) => void;
    priceDistribution: MedianPrice[];
    minPrice: number;
    maxPrice: number;
  }