import { Layout } from '@/component/Layout';
import { ToastProvider } from '@/component/Toast';
import { ReduxProvider } from '@/redux/provider';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Layout>
        <ToastProvider>{children}</ToastProvider>
      </Layout>
    </ReduxProvider>
  );
}
