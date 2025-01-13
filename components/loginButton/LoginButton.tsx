import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, initializeAuth } from '../../store/auth/authSlice';
import { Button } from '@mui/material';

export default function LoginButton({ handleLogin, handleProfileClick }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      {!user ? (
        <Button
          variant="contained"
          sx={{ 
            ml: 2,
            backgroundColor: 'white',
            color: '#FF0000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            }
          }}
          onClick={handleLogin}
        >
          Log in
        </Button>
      ) : (
        <img 
          src={user.pic} 
          alt={user.name || 'User profile'} 
          onClick={handleProfileClick}
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        />
      )}
    </>
  );
}