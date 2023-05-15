import React from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
