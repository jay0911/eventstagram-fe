import { useCallback } from 'react';
import { useRouter } from 'next/router';  // or 'next/navigation' for Next.js 13+ app dir
import { cookieService } from '../utils/cookieService';

export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    cookieService.clearAll();
    router.push('/'); // or wherever you want to redirect after logout
  }, [router]);

  return logout;
}; 