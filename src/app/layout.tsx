'use client';
import { Inter } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AppFooter from './components/app.footer';
import AppHeader from './components/app.header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <Container style={{ minHeight: 'calc(100vh - 106px)' }}> {children}</Container>
        <AppFooter />
        <ToastContainer />
      </body>
    </html>
  );
}
