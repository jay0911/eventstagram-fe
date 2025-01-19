// utils/fetchServices.ts
import { Service, ServiceFormData, ServicesResponse, ServiceStatistics } from '../types/ServiceTypes';
import api, { formApi } from './fetchClient';
import { DEFAULT_SERVICE_PARAMS } from '../utils/urlParams';
import { buildUrlWithParams } from '../utils/urlParams';
import { ServiceQueryParams } from '../utils/urlParams';

export const fetchServices = async ({
  name,
  page = DEFAULT_SERVICE_PARAMS.page,
  sortBy = DEFAULT_SERVICE_PARAMS.sortBy,
  sortOrder = DEFAULT_SERVICE_PARAMS.sortOrder,
  minPrice,
  maxPrice,
  availableLocation,
}: ServiceQueryParams): Promise<ServicesResponse> => {
  const baseUrl = '/api/services/list';
  
  const url = buildUrlWithParams(baseUrl, {
    name,
    page,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    availableLocation,
  });

  const response = await api.fetch(url);
  return response;
};

export const fetchUserServices = async ({
  name,
  page = DEFAULT_SERVICE_PARAMS.page,
  sortBy = DEFAULT_SERVICE_PARAMS.sortBy,
  sortOrder = DEFAULT_SERVICE_PARAMS.sortOrder,
  minPrice,
  maxPrice,
  availableLocation,
}: ServiceQueryParams & { userId: string }): Promise<ServicesResponse> => {
  const baseUrl = `/api/services/user`;
  
  const url = buildUrlWithParams(baseUrl, {
    name,
    page,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    availableLocation,
  });

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

export const fetchLikedServicesIds = async (userEmail: string): Promise<string[]> => {
  const response = await api.fetch(`/api/services/users/${userEmail}/likes`);
  return response.map((service: any) => service.id);
};

export const fetchLikedServices = async ({
  userId,
  page = DEFAULT_SERVICE_PARAMS.page,
}: {
  userId: string;
  page?: number;
}): Promise<ServicesResponse> => {
  const baseUrl = '/api/services/liked';
  
  const url = buildUrlWithParams(baseUrl, {
    userId,
    page,
  });

  try {
    const response = await api.fetch(url);
    return response;
  } catch (error) {
    console.error('Error fetching liked services:', error);
    throw error; // Re-throw to be handled by the toast
  }
};

export const createService = async (data: ServiceFormData, tags: string[]) => {

    const formData = new FormData();
    
    const serviceRequest = {
      name: data.name,
      description: data.description,
      websiteLink: data.websiteLink,
      email: data.email,
      priceMin: data.priceMin,
      priceMax: data.priceMax,
      phoneNumber: data.phoneNumber,
      tags: tags,
      availableLocation: data.availableLocation
    };
    
    formData.append('serviceRequest', JSON.stringify(serviceRequest));
    
    if (data.images) {
      Array.from(data.images).forEach((image) => {
        formData.append('images', image);
      });
    }
    
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail);
    }


    const serviceRequestData = formData.get('serviceRequest');
    const newFormData = new FormData();
    
    // Append serviceRequest with type specification
    newFormData.append(
      'serviceRequest', 
      new Blob([serviceRequestData as string], { type: 'application/json' }), 
      'serviceRequest.json'
    );
    
    // Copy over the files
    formData.getAll('images').forEach(image => {
      newFormData.append('images', image);
    });
    
    const thumbnail = formData.get('thumbnail');
    if (thumbnail) {
      newFormData.append('thumbnail', thumbnail);
    }

    const response = await formApi.fetch('/api/services', newFormData);



    return response;
};

export const toggleServiceLike = async (
  serviceId: string,
  email: string,
  isLiked: boolean
): Promise<any> => {
  const endpoint = isLiked ? 'unlike' : 'like';
  try {
    const response = await fetch(`/api/services/${serviceId}/${endpoint}/${email}`, {
      method: isLiked ? 'DELETE' : 'POST',
    });

    if (!response.ok) {
      throw new Error('stop spamming' || `Failed to ${endpoint} service`);
    }

    return response;
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error; // Re-throw to be handled by the toast
  }
};