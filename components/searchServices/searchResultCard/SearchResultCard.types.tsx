export interface SearchResultCardProps {
    title: string;
    description: string;
    imageUrl: string;
    minPrice: number;
    onClick: () => void;
    serviceId: string;
  }