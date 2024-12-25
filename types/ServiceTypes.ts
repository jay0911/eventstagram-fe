export interface Image {
    id: string;
    imagePath: string;
    resourceUrl: string;
    zoomValue: number;
    xcoordinate: number;
    ycoordinate: number;
  }
  
  export interface Service {
    id: string;
    name: string;
    description: string;
    websiteLink: string;
    email: string;
    phoneNumber: string;
    images: Image[];
    thumbnail: Image; 
    tags: string[];
    isEnabled: boolean;
    priceMin: number;
    priceMax: number;
  }
  
  export interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface ServicesResponse {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    numberOfElements: number;
    content: Service[];
    sort: Sort;
    first: boolean;
    last: boolean;
    pageable: Pageable;
    empty: boolean;
  }


  export interface PriceRange {
    minPrice: number;
    maxPrice: number;
  }
  
  export interface MedianPrice {
    price: string;
    count: number;
  }
  
  export interface ServiceStatistics {
    priceRange: PriceRange;
    medianPrices: MedianPrice[];
  }