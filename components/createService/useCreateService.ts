import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ServiceFormData } from 'types/ServiceTypes';
import { createService } from 'api/fetchServices';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MIN_WIDTH = 800;
export const MIN_HEIGHT = 600;
export const MAX_IMAGES = 10;

export const validateImageDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = document.createElement('img') as HTMLImageElement;
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img.width >= MIN_WIDTH && img.height >= MIN_HEIGHT);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve(false);
    };
  });
};

export const useCreateService = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: '',
      description: '',
      websiteLink: '',
      email: '',
      priceMin: 0,
      priceMax: 0,
      phoneNumber: '',
      availableLocation: '',
      tags: [],
      images: [],
      thumbnail: null,
    },
  });

  const handleAddTag = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newTag.trim()) {
      event.preventDefault();
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleImageChange = async (files: FileList | null, onChange: (files: File[]) => void, currentFiles: File[] = []) => {
    if (files) {
      const newFiles = Array.from(files);
      const totalFiles = [...currentFiles, ...newFiles];
      
      // Check if adding new files exceeds the limit
      if (totalFiles.length > MAX_IMAGES) {
        alert(`You can only upload up to ${MAX_IMAGES} images`);
        return;
      }

      // Validate each new file
      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) {
          alert('Each image must be less than 5MB');
          return;
        }

        const validDimensions = await validateImageDimensions(file);
        if (!validDimensions) {
          alert(`Images must be at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels`);
          return;
        }
      }

      onChange(totalFiles);
    }
  };

  const handleDeleteImage = (index: number, value: File[], onChange: (files: File[]) => void) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

 
  const onSubmit = async (data: ServiceFormData) => {
    try {
      await createService(data, tags);
      console.log('Service created successfully');
      // Handle success (e.g., show notification, redirect)
    } catch (error) {
      console.error('Error creating service:', error);
      // Handle error (e.g., show error message)
    }
  };
  
  const handlePriceChange = (value: string, onChange: (value: string) => void) => {
    // Allow empty string or non-negative numbers
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
      onChange(value);
    }
  };

  const handlePriceBlur = (value: string, onChange: (value: number) => void) => {
    // Convert empty to zero or ensure non-negative
    const numValue = Number(value);
    if (value === '' || numValue < 0) {
      onChange(0);
    } else {
      onChange(numValue);
    }
  };

     
  return {
    control,
    handleSubmit,
    errors,
    tags,
    newTag,
    setNewTag,
    handleAddTag,
    handleDeleteTag,
    handleImageChange,
    handleDeleteImage,
    handlePriceChange,
    onSubmit,
    MAX_IMAGES,
    validateImageDimensions,
    handlePriceBlur,
    MAX_FILE_SIZE,
    MIN_WIDTH,
    MIN_HEIGHT,
  };
};