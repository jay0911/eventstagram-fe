// utils/fetchServices.ts
import { Service, ServicesResponse, ServiceStatistics } from '../types/ServiceTypes';
import api from './fetchClient';

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

  const response = await api.fetch(url);
  return response;
};

export const fetchServiceStatistics = async (): Promise<ServiceStatistics> => {
  const response = await api.fetch('/api/services/statistics');
  return response;
};

export const fetchServiceById = async (id: string): Promise<Service> => {
  const response = await api.fetch(`/api/services/${id}`);
  return response;
};

export const fetchLikedServices = async (userEmail: string): Promise<string[]> => {
  const response = await api.fetch(`/api/services/users/${userEmail}/likes`);
  return response.map((service: any) => service.id);
};