import { Drawer, Box, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function NavigationDrawer({ open, onClose, onLogout }: NavigationDrawerProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: false
  });

  const handleLogout = () => {
    dispatch(logout());
    onLogout();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 300,
          height: '100%',
        },
      }}
    >
      <Box sx={{ 
        width: '100%', 
        height: '100%',
        position: 'relative'
      }}>
        {/* Header with Logo and Close Button */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1 
          }}>
            <Image 
              src="/favicon1.ico" 
              alt="Logo" 
              width={30} 
              height={30} 
              style={{ 
                borderRadius: '50%'
              }}
            />
            <Typography variant="h6" component="div">
              Eventstagram
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: { xs: 'block', sm: 'none' }
          }}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Content Container */}
        <Box sx={{ p: 2 }}>
          {/* User Profile Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2
          }}>
            <img 
              src={user?.pic} 
              alt={user?.name || 'User profile'}
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                marginRight: '12px' 
              }}
            />
            <Box>
              <Typography variant="subtitle1">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>

          {/* Navigation Items */}
          <Box sx={{ my: 2 }}>
            {[
              { text: 'Find Services', href: '/services' },
              { text: 'Create Service', href: '/services/create' },
              { text: 'My Services', href: '/services/my-services' },
              { text: 'Liked Services', href: '/services/liked' },
              { text: 'My events', href: '/my-events' },
              { text: 'FAQs', href: '/faqs' }
            ].map((item) => (
              <Link
                key={item.text}
                href={item.href}
                style={{ textDecoration: 'none', width: '100%', display: 'block' }}
                onClick={onClose}
              >
                <Button
                  fullWidth
                  sx={{ 
                    justifyContent: 'flex-start', 
                    textTransform: 'none', 
                    py: 1.5,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {item.text}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Logout Button */}
          <Button
            fullWidth
            onClick={handleLogout}
            sx={{ 
              mt: 2,
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
                opacity: 0.1
              }
            }}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}