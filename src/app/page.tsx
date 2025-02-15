import Image from 'next/image';
import Link from 'next/link';
import x from '@/styles/app.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home page description',
};
export default function Home() {
  metadata.title = 'Home page';
  metadata.description = 'Home page description';
  return <h1>Home page</h1>;
}
