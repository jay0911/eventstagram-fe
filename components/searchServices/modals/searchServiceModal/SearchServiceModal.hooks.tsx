import { useState,useEffect } from "react";
import { FullScreenSearchModalProps } from "./SearchServiceModal.types";

export const usePriceRangeModal = ({ isOpen, onClose, onSearch }: FullScreenSearchModalProps) => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
  
    const handleSearch = () => {
      onSearch(name, location);
      onClose();
    };
  
    useEffect(() => {
      console.log(isOpen)
    }, [isOpen]);

    return {
        name,
        setName,
        location,
        setLocation,
        handleSearch,
    }
}