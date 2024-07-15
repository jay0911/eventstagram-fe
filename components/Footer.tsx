// components/Footer.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import styles from './styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Eventstagram. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
