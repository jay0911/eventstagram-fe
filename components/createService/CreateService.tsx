import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Chip,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import Image from 'next/image';
import styled from '@emotion/styled';
import { Controller } from 'react-hook-form';
import { useCreateService } from './useCreateService';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreateService() {
  const {
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
    handlePriceBlur,
    onSubmit,
    MAX_IMAGES,
    validateImageDimensions,
    MAX_FILE_SIZE,
    MIN_WIDTH,
    MIN_HEIGHT,
  } = useCreateService();

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Service
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Service Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="websiteLink"
              control={control}
              rules={{ required: 'Website link is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Website Link"
                  error={!!errors.websiteLink}
                  helperText={errors.websiteLink?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Box>
              <Typography gutterBottom>Price Range</Typography>
              <Box sx={{ px: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Controller
                    name="priceMin"
                    control={control}
                    rules={{ 
                      required: 'Minimum price is required',
                      min: {
                        value: 0,
                        message: 'Minimum price cannot be negative'
                      },
                      validate: (value, formValues) => {
                        if (Number(value) >= Number(formValues.priceMax)) {
                          return 'Minimum price must be less than maximum price';
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Minimum Price"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={!!errors.priceMin}
                        helperText={errors.priceMin?.message}
                        fullWidth
                        onChange={(e) => handlePriceChange(e.target.value, field.onChange)}
                        onBlur={(e) => handlePriceBlur(e.target.value, field.onChange)}
                      />
                    )}
                  />

                  <Controller
                    name="priceMax"
                    control={control}
                    rules={{ 
                      required: 'Maximum price is required',
                      min: {
                        value: 0,
                        message: 'Maximum price cannot be negative'
                      },
                      validate: (value, formValues) => {
                        if (Number(value) <= Number(formValues.priceMin)) {
                          return 'Maximum price must be greater than minimum price';
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Maximum Price"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        error={!!errors.priceMax}
                        helperText={errors.priceMax?.message}
                        fullWidth
                        onChange={(e) => handlePriceChange(e.target.value, field.onChange)}
                        onBlur={(e) => handlePriceBlur(e.target.value, field.onChange)}
                      />
                    )}
                  />
                </Stack>
              </Box>
            </Box>

            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="availableLocation"
              control={control}
              rules={{ required: 'Available location is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Available Location"
                  error={!!errors.availableLocation}
                  helperText={errors.availableLocation?.message}
                  fullWidth
                />
              )}
            />

            <Box>
              <TextField
                label="Tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                fullWidth
                helperText="Press Enter to add a tag"
              />
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Service Images
              </Typography>
              <Controller
                name="images"
                control={control}
                rules={{ 
                  required: 'At least one image is required',
                  validate: async (files) => {
                    if (!files || files.length === 0) return 'At least one image is required';
                    if (files.length > MAX_IMAGES) return `Maximum ${MAX_IMAGES} images allowed`;
                    
                    for (const file of files) {
                      // Check file size
                      if (file.size > MAX_FILE_SIZE) {
                        return 'Each image must be less than 5MB';
                      }
                      
                      // Check dimensions
                      const validDimensions = await validateImageDimensions(file);
                      if (!validDimensions) {
                        return `Images must be at least ${MIN_WIDTH}x${MIN_HEIGHT} pixels`;
                      }
                    }
                    return true;
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <Box>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      sx={{ mb: 2, width: '100%' }}
                      disabled={value && (value as File[])?.length >= MAX_IMAGES}
                    >
                      Upload Images ({(value as File[])?.length || 0}/{MAX_IMAGES})
                      <VisuallyHiddenInput
                        type="file"
                        multiple
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => handleImageChange(e.target.files, onChange, value as File[])}
                      />
                    </Button>
                    {errors.images && (
                      <Typography color="error" variant="caption" display="block" sx={{ mb: 2 }}>
                        {errors.images.message}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                      Upload up to 10 images. Each image must be:
                      <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                        <li>At least {MIN_WIDTH}x{MIN_HEIGHT} pixels</li>
                        <li>Less than 5MB in size</li>
                        <li>Common image format (JPG, PNG)</li>
                        <li>Better to add valid business Document</li>
                      </ul>
                    </Typography>
                    <Box sx={{ 
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(5, 1fr)'
                      },
                      gap: 1
                    }}>
                      {value && (value as File[]).map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: 'relative',
                            paddingTop: '100%',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            overflow: 'hidden'
                          }}
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              },
                              color: 'white',
                            }}
                            onClick={() => handleDeleteImage(index, value as File[], onChange)}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Thumbnail Image
              </Typography>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: 'Thumbnail is required' }}
                render={({ field: { onChange, value } }) => (
                  <Box>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUpload />}
                      sx={{ 
                        mb: 2,
                        width: '100%'
                      }}
                    >
                      Upload Thumbnail
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          onChange(files?.[0] || null);
                        }}
                      />
                    </Button>
                    {errors.thumbnail && (
                      <Typography color="error" variant="caption" display="block" sx={{ mb: 2 }}>
                        {errors.thumbnail.message}
                      </Typography>
                    )}
                    {value && (
                      <Box
                        sx={{
                          position: 'relative',
                          width: 200,
                          height: 200,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                          overflow: 'hidden'
                        }}
                      >
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="Thumbnail preview"
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
            >
              Create Service
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
} 