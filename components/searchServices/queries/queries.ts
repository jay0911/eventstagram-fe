import { useQuery } from "@tanstack/react-query";
import { ServicesResponse, ServiceStatistics } from "types/ServiceTypes";
import { fetchServices, fetchServiceStatistics } from "utils/fetchServices";

export const useServices = (
    name: string,
    page: number = 0,
    sortBy: string = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',
    minPrice?: number,
    maxPrice?: number
  ) => {
    return useQuery<ServicesResponse>(
      {
        queryKey: ['services', name, page, sortBy, sortOrder, minPrice, maxPrice],
        queryFn: () => fetchServices(name, page, sortBy, sortOrder,minPrice,maxPrice),
      }
    );
};

export const useServiceStatistics = () => {
  return useQuery<ServiceStatistics>({
    queryKey: ['serviceStatistics'],
    queryFn: () => fetchServiceStatistics(),
  });
};