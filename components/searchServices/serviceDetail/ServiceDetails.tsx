import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useLike } from 'hooks/useLike';


interface ServiceDetailsProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  minPrice: number;
  onBack: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  id,
  title,
  description,
  images,
  minPrice,
  onBack,
}) => {

  const { handleLikeClick, isLoading, likedServices } = useLike({serviceId: id});

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-[0px] sm:top-[0px] md:top-[0px] pt-14 md:pt-16 left-0 right-0 bg-white z-10 shadow-md">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            <span className="text-lg">Back to results</span>
          </button>
          <button 
            onClick={handleLikeClick}
            disabled={isLoading}
          >
            {likedServices.has(id) ? (
              <HeartSolid className="w-6 h-6 text-red-600" />
            ) : (
              <HeartOutline className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content - adjusted padding for smaller header */}
      <div>
        {/* Hero Image Carousel */}
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <img 
            src={images[currentImageIndex]} 
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              {/* Left click area */}
              <div 
                onClick={prevImage}
                className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
              />
              
              {/* Right click area */}
              <div 
                onClick={nextImage}
                className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
              />

              {/* Navigation arrows (visual indicators) */}
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full pointer-events-none"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full pointer-events-none"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className=" mx-auto px-2 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">
            {title}
          </h1>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600">Starting from</div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-red-600">
                ${minPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">per service</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-3">About this service</h2>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white pb-12">
        <div className="max-w-4xl mx-auto">
          <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;