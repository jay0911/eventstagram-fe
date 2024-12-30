// utils/fetchServices.ts
import { Service, ServicesResponse, ServiceStatistics } from '../types/ServiceTypes';

export const fetchServices = async (
  name: string,
  page: number = 0,
  sortBy: string = 'name',
  sortOrder: 'asc' | 'desc' = 'asc',
  minPrice?: number,
  maxPrice?: number,
  availableLocation?: string
): Promise<ServicesResponse> => {
  const baseUrl = '/api/services/list';
  const params = new URLSearchParams();

  // Add query parameters dynamically
  if (name) params.append('name', name);
  params.append('page', page.toString());
  params.append('sortBy', sortBy);
  params.append('sortOrder', sortOrder);
  if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
  if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
  if (availableLocation) params.append('availableLocation', availableLocation);

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch services. Status: ${response.status}`);
  }

  return response.json();
};

export const fetchServiceStatistics = async (): Promise<ServiceStatistics> => {
  const response = await fetch('/api/services/statistics');

  if (!response.ok) {
    throw new Error(`Failed to fetch service statistics. Status: ${response.status}`);
  }

  return response.json();
};

export const fetchServiceById = async (id: string): Promise<Service> => {
  const response = await fetch(`/api/services/${id}`);
  if (!response.ok) {
      throw new Error('Service not found');
  }
  return response.json();
};