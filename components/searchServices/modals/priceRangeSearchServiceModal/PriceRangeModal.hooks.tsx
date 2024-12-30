import { useEffect, useState } from "react";
import { FullScreenPriceRangeModalProps } from "./PriceRangeModal.types";

export const usePriceRangeModal = ({ onClose, onApply, minPrice, maxPrice }: FullScreenPriceRangeModalProps) => {

    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
    const [chartWidth, setChartWidth] = useState(0);
  
    useEffect(() => {
      const updateWidth = () => {
        setChartWidth(window.innerWidth - 48);
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
  
    // Reset price range when min/max prices change
    useEffect(() => {
      setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);
  
    const handleChange = (event: Event, newValue: number | number[]) => {
      setPriceRange(newValue as [number, number]);
    };
  
    const handleApply = () => {
      onApply({ min: priceRange[0], max: priceRange[1] });
      onClose();
    };
    

    return {
        priceRange,
        setPriceRange,
        chartWidth,
        handleChange,
        handleApply,
    }
}