type ParamValue = string | number | boolean | undefined | null;

interface QueryParams {
  [key: string]: ParamValue;
}

export const buildUrlWithParams = (baseUrl: string, params: QueryParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

// Default params for service queries
export const DEFAULT_SERVICE_PARAMS = {
  page: 0,
  sortBy: 'name',
  sortOrder: 'asc' as const,
};

// Type for service query parameters
export interface ServiceQueryParams extends QueryParams {
  name?: string;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  availableLocation?: string;
} 