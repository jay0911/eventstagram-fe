import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from 'store';
import { fetchLikedServices } from 'utils/fetchServices';

export const useLike = ({serviceId}) => {

    const router = useRouter();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    const [likedServices, setLikedServices] = useState<Set<string>>(new Set());
  
    useEffect(() => {
      const loadLikedServices = async () => {
        console.log('isAuthenticated', isAuthenticated);
        console.log('user', user);
        if (!isAuthenticated || !user) return;
        
        try {
          const likedServiceIds = await fetchLikedServices(user.email);
          setLikedServices(new Set(likedServiceIds));
        } catch (error) {
          console.error('Error fetching liked services:', error);
        }
      };
  
      loadLikedServices();
    }, [isAuthenticated, user]);
  
    const handleLikeClick = async (e: React.MouseEvent) => {

    const isLiked = likedServices.has(serviceId);
      e.stopPropagation();
      if (isLoading) return;
  
      if (!isAuthenticated) {
        // Redirect to login page
        router.push('/login');
        return;
      }
  
      setIsLoading(true);
      
      const onLikeToggle = (isLiked: boolean) => {
        const newLikedServices = new Set(likedServices);
        if (likedServices.has(serviceId)) {
          newLikedServices.delete(serviceId);
        } else {
          newLikedServices.add(serviceId);
        }
        setLikedServices(newLikedServices);
      }
    
      try {
        const email = user.email; // Get email from authenticated user
        const endpoint = isLiked ? 'unlike' : 'like';
        
        const response = await fetch(`/api/services/${serviceId}/${endpoint}/${email}`, {
          method: isLiked ? 'DELETE' : 'POST',
        });
        
        if (response.ok) {
          onLikeToggle?.(!isLiked);
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      } finally {
        setIsLoading(false);
      }
    };

    return {
        handleLikeClick,
        isLoading,
        likedServices,
        setLikedServices
    }

}