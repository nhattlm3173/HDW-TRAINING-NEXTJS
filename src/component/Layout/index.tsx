'use client';

import { memo, ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const Layout = memo(function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
});
