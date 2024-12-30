import { useQuery } from "@tanstack/react-query";
import { ServicesResponse, ServiceStatistics, Service } from "types/ServiceTypes";
import { fetchServiceById, fetchServices, fetchServiceStatistics } from "utils/fetchServices";

export const useServices = (
    name: string,
    page: number = 0,
    sortBy: string = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
    minPrice?: number,
    maxPrice?: number,
    availableLocation?: string
  ) => {
    return useQuery<ServicesResponse>(
      {
        queryKey: ['services', name, page, sortBy, sortOrder, minPrice, maxPrice, availableLocation],
        queryFn: () => fetchServices(name, page, sortBy, sortOrder, minPrice, maxPrice, availableLocation),
      }
    );
};

export const useServiceStatistics = () => {
  return useQuery<ServiceStatistics>({
    queryKey: ['serviceStatistics'],
    queryFn: () => fetchServiceStatistics(),
  });
};

export const useServiceById = (id: string) => {
    return useQuery<Service>({
        queryKey: ['service', id],
        queryFn: () => fetchServiceById(id),
        enabled: !!id,
    });
};