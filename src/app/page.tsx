import Image from 'next/image';
import Link from 'next/link';
// import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <li>
          <Link href="/facebook">Facebook</Link>
          <a href="/vudepzai"> Vu dep zai page</a>
        </li>
      </ul>
    </div>
  );
}
