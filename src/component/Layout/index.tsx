'use client';

import { memo, ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = memo(function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
});
