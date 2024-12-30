export interface FullScreenSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (name: string, location: string) => void;
  }