// components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container maxWidth="lg" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <main className="flex-grow overflow-y-auto">{children}</main>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
