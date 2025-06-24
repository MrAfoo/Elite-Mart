'use client';
import { Auth0Provider } from '@auth0/auth0-react';

export function Auth0ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-izvhwekqmawhub10.us.auth0.com"
      clientId="1bxKUGVUpyngDcrwcKLjWk9eIH1n6udn"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : ''
      }}
    >
      {children}
    </Auth0Provider>
  );
}
