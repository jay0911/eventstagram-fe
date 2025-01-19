'use client';

import { useServiceById } from 'components/searchServices/queries/queries';
import ServiceDetails from 'components/searchServices/serviceDetail/ServiceDetails';
import { useRouter } from 'next/router';

import { useEffect } from 'react';

const ServiceDetailsPage = () => {
  const router = useRouter();

  // Wait for router to be ready
  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  const { id } = router.query;
  const { data: service, isLoading, error } = useServiceById(id as string);

  const handleBack = () => {
    router.back();
  };

  // Add check for loading state
  if (isLoading || !router.isReady) {
    return <div>Loading...</div>;
  }

  if (error || !service) {
    // Use useEffect for navigation to avoid hydration issues
    useEffect(() => {
      router.push('/services');
    }, []);
    return null;
  }

  console.log('service', service);

  return (
    <ServiceDetails
      id={service.id}
      title={service.name}
      images={service.images.map((image) => image.resourceUrl)}
      minPrice={0}
      description={service.description}
      onBack={handleBack}
      ownerEmail={service.createdBy.email}
    />
  );
};

export default ServiceDetailsPage;