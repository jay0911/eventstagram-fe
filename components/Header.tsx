// components/Header.tsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles/Header.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LoginButton from './loginButton/LoginButton';
import { useLogout } from '../hooks/useLogout';
import NavigationDrawer from './navigationDrawer/NavigationDrawer';

export default function Header() {
  const router = useRouter();
  const logout = useLogout();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileClick = () => {
    setDrawerOpen(true);
  };

  return (
    <AppBar position="sticky" style={{ top: 0, zIndex: 1000 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/" className={styles.link} style={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              src="/favicon1.ico" 
              alt="Logo" 
              width={30} 
              height={30} 
              style={{ 
                marginRight: '8px',
                borderRadius: '50%'
              }}
            />
            Eventstagram
          </Link>
        </Typography>
        <Link href="/services" className={styles.link} >
          Services
        </Link>
        <LoginButton 
          handleLogin={() => router.push('/login')} 
          handleProfileClick={handleProfileClick}
        />
      </Toolbar>
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLogout={logout}
      />
    </AppBar>
  );
}
