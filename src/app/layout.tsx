'use client';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppFooter from './app.footer';
import AppHeader from './app.header';
import Container from 'react-bootstrap/Container';
import { metadata } from './meta-data';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <Container> {children}</Container>
        <AppFooter />
      </body>
    </html>
  );
}
