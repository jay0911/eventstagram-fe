import { Button, Typography, Container, Box, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGoogleLogin = () => {
    // This URL should match your Spring Boot OAuth2 endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'white',
        zIndex: 1200,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          flex: { sm: '1' },
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
            mt: { xs: 4, sm: 0 }
          }}
        >
          <Image 
            src="/favicon1.ico" 
            alt="Logo" 
            width={50} 
            height={50} 
            style={{ 
              borderRadius: '50%',
              marginBottom: '8px'
            }}
          />
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FF0000' }}>
            Welcome to Eventstagram
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Create an account or log in to get exclusive deals, perks, and more.
          </Typography>

          <Button
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: '#FF0000' }} />}
            sx={{
              width: '100%',
              maxWidth: '400px',
              py: 1.5,
              textTransform: 'none',
              border: '1px solid #ddd',
              color: '#FF0000',
              '&:hover': {
                border: '1px solid #aaa',
                backgroundColor: '#f8f8f8'
              }
            }}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'relative',
          flex: { sm: '1' },
          mt: { xs: 'auto', sm: 0 },
          height: { xs: '55vh', sm: '100%' }
        }}
      >
        <Image
          src="/login1.jpg"
          alt="Login background"
          fill
          style={{
            objectFit: 'cover'
          }}
        />
      </Box>
    </Box>
  );
};

export default LoginPage; 