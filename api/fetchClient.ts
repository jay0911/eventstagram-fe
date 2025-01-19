import { cookieService } from "../utils/cookieService";

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

const formApi = {
  fetch: async (url: string, formData: FormData) => {
      const token = cookieService.getToken();

      const headers = {
          'Authorization': token ? `Bearer ${token}` : '',
      };

      const response = await fetch(url, {
          method: 'POST',
          headers,
          body: formData,
      });

      if (!response.ok) {
          throw new Error('API call failed');
      }

      return response.json();
  }
};

export { api as default, formApi };