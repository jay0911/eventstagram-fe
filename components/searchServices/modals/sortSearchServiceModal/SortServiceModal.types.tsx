export interface FullScreenSortModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (selectedOption: { value: string; label: string }) => void; // Pass both value and label to parent
  }