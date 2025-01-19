import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ServicesResponse } from 'types/ServiceTypes';
import SearchResultCard from '../searchServices/searchResultCard/SearchResultCard';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchLikedServices } from 'api/fetchServices';
import { DEFAULT_SERVICE_PARAMS } from 'utils/urlParams';
import Pagination from '../common/pagination/Pagination';

import { useToast } from '../common/toast/ToastContext';

export const LikedServicesList = () => {
    const router = useRouter();
    const { showError } = useToast();
    const { user } = useSelector((state: RootState) => state.auth);
    const [services, setServices] = useState<ServicesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(DEFAULT_SERVICE_PARAMS.page);

    const fetchServices = async () => {
        console.log('fetchServices');
        if (!user?.sub) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            
            // Wait for 1 second before making the API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await fetchLikedServices({
                userId: user.sub,
                page: currentPage,
            });
            setServices(response);
        } catch (err) {
            console.error('Error in fetchServices:', err);
            showError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [currentPage, user?.sub]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage - 1);
    };

    const handleServiceClick = (serviceId: string) => {
        router.push(`/services/${serviceId}`);
    };

    if (isLoading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '400px' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!services || services.content.length === 0) {
        return (
            <Box sx={{ 
                textAlign: 'center', 
                py: 4 
            }}>
                <Typography>
                    You haven't liked any services yet.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Liked Services
            </Typography>
            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
                {services.content.map((service) => (
                    <SearchResultCard
                        key={service.id}
                        serviceId={service.id}
                        title={service.name}
                        description={service.description}
                        imageUrl={service.thumbnail?.resourceUrl}
                        minPrice={service.priceMin}
                        onClick={() => handleServiceClick(service.id)}
                        onLikeToggle={fetchServices}
                    />
                ))}
                
                {services.totalElements > 0 && (
                    <Pagination
                        currentPage={services.number + 1} // Convert to 1-based indexing for display
                        totalPages={services.totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </Box>
        </Box>
    );
};

export default LikedServicesList; 