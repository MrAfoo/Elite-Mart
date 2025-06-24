'use client';

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ClientProviderNoSSR } from './components/ClientProvider';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import { Auth0ProviderWrapper } from './components/Auth0ProviderWrapper';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0ProviderWrapper>
      <CartProvider>
        <ClientProviderNoSSR>
          <Navbar />
          <main className="flex-grow bg-white dark:bg-white">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 2000,
                style: {
                  background: '#22c55e',
                },
              },
              error: {
                duration: 2000,
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </ClientProviderNoSSR>
      </CartProvider>
    </Auth0ProviderWrapper>
  );
}
