import { cookieService } from "./cookieService";

const api = {
  fetch: async (url: string, options: RequestInit = {}) => {
      const token = cookieService.getToken();
      
      const headers = {
          ...options.headers,
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
      };

      const response = await fetch(url, {
          ...options,
          headers,
      });

      if (!response.ok) {
          throw new Error('API call failed');
      }

      return response.json();
  }
};

export default api;