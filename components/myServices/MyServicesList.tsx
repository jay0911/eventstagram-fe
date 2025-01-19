import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ServicesResponse } from 'types/ServiceTypes';
import SearchResultCard from '../common/searchResultCard/SearchResultCard';
import { Box, Typography, CircularProgress } from '@mui/material';
import { fetchUserServices } from 'api/fetchServices';
import { DEFAULT_SERVICE_PARAMS } from 'utils/urlParams';
import Pagination from 'components/common/pagination/Pagination';

export const MyServicesList = () => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [services, setServices] = useState<ServicesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_SERVICE_PARAMS.page);

    useEffect(() => {
        const fetchMyServices = async () => {
            if (!user?.email) return;

            try {
                setIsLoading(true);
                const response = await fetchUserServices({
                    userId: user.email,
                    page: currentPage,
                    sortBy: DEFAULT_SERVICE_PARAMS.sortBy,
                    sortOrder: DEFAULT_SERVICE_PARAMS.sortOrder
                });
                setServices(response);
            } catch (err) {
                setError('Failed to load services');
                console.error('Error fetching services:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyServices();
    }, [user?.email, currentPage]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage - 1); // Convert from 1-based to 0-based indexing
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

    if (error) {
        return (
            <Box sx={{ 
                textAlign: 'center', 
                py: 4 
            }}>
                <Typography color="error">{error}</Typography>
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
                    You haven't created any services yet.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                My Services
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
                    />
                ))}
                
                <Pagination
                            currentPage={services.number + 1} // Convert to 1-based indexing for display
                            totalPages={services.totalPages}
                            onPageChange={handlePageChange}
                        />
            </Box>
        </Box>
    );
};

export default MyServicesList; 