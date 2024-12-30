// components/Header.tsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';
import styles from './styles/Header.module.css';


const Header: React.FC = () => {
  return (
    <AppBar position="sticky" style={{ top: 0, zIndex: 1000 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </Typography>
        <Link href="/services" className={styles.link} >
          Services
        </Link>
        <Link href="/contact" className={styles.link} >
          Contact
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
