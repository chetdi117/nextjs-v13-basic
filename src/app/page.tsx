import Image from 'next/image';
import Link from 'next/link';
import x from '@/styles/app.module.css';
// import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <li className={x['red']}>
          <Link href="/facebook">Facebook</Link>
        </li>
        <li className={x['green']}>
          <a href="/vudepzai"> Vu dep zai page</a>
        </li>
      </ul>
    </div>
  );
}
