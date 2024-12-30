import { useState } from "react";
import { FullScreenSortModalProps } from "./SortServiceModal.types";

export const useSortServiceModal = ({ onClose, onApply }: FullScreenSortModalProps) => {

    const options = [
        { value: "name,desc", label: "Name, Highest first" },
        { value: "name,asc", label: "Name, Lowest first" },
      ];
    
      const [selectedOption, setSelectedOption] = useState<{
        value: string;
        label: string;
      }>(options[0]); // Default selection
    
      const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const selected = options.find((option) => option.value === selectedValue);
        if (selected) {
          setSelectedOption(selected);
        }
      };
    
      const handleApply = () => {
        onApply(selectedOption); // Pass the selected option (value and label) to the parent
        onClose(); // Close the dialog
      };

      return {
        selectedOption,
        setSelectedOption,
        handleOptionChange,
        handleApply,
        options,
      } 
}