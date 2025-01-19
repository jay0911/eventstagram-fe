import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { RootState } from 'store';
import { fetchLikedServicesIds, toggleServiceLike } from 'api/fetchServices';
import { useToast } from 'components/common/toast/ToastContext';

// Global state
const globalState = {
    likedServicesCache: new Set<string>(),
    isLoadingCache: false,
    likedServicesState: new Set<string>()
};

export const useLike = ({serviceId}: {serviceId: string}) => {
    const router = useRouter();
    const { showError, showToast } = useToast();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [likedServices, setLikedServices] = useState<Set<string>>(globalState.likedServicesState);

    // Memoize the check for whether the current service is liked
    const isLiked = useMemo(() => likedServices.has(serviceId), [likedServices, serviceId]);

    // Memoize the loadLikedServices function
    const loadLikedServices = useCallback(async () => {
        if (!isAuthenticated || !user?.email || globalState.isLoadingCache) return;
        
        if (globalState.likedServicesCache.size > 0) {
            setLikedServices(new Set(globalState.likedServicesCache));
            return;
        }

        globalState.isLoadingCache = true;
        try {
            const likedServiceIds = await fetchLikedServicesIds(user.email);
            const newLikedServices = new Set(likedServiceIds);
            setLikedServices(newLikedServices);
            
            globalState.likedServicesCache.clear();
            likedServiceIds.forEach(id => globalState.likedServicesCache.add(id));
            globalState.likedServicesState = newLikedServices;
        } catch (error) {
            console.error('Error fetching liked services:', error);
        } finally {
            globalState.isLoadingCache = false;
        }
    }, [isAuthenticated, user?.email]);

    // Memoize the handleLikeClick function
    const handleLikeClick = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLoading) return;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        setIsLoading(true);
        
        try {
            const email = user!.email;
            const endpoint = isLiked ? 'unlike' : 'like';
            
            const response = await toggleServiceLike(serviceId, email, isLiked);
            
            showToast(`Service ${endpoint}`, 'success');  

            if (response.ok) {
                const newLikedServices = new Set(likedServices);
                if (isLiked) {
                    newLikedServices.delete(serviceId);
                    globalState.likedServicesCache.delete(serviceId);
                } else {
                    newLikedServices.add(serviceId);
                    globalState.likedServicesCache.add(serviceId);
                }
                setLikedServices(newLikedServices);
                globalState.likedServicesState = newLikedServices;
            }
        } catch (error) {
            showError(error);
            console.error('Error toggling like:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, isAuthenticated, router, user, serviceId, isLiked, likedServices]);

    // Memoize the returned object to prevent unnecessary re-renders
    const returnValue = useMemo(() => ({
        handleLikeClick,
        isLoading,
        likedServices,
        setLikedServices,
        isLiked
    }), [handleLikeClick, isLoading, likedServices, isLiked]);

    useEffect(() => {
        loadLikedServices();
    }, [loadLikedServices]);

    return returnValue;
}