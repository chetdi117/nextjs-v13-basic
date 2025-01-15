/** @format */

import Image from 'next/image';
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
          <a href="/facebook">facebook</a>
          <a href="/vudepzai"> Vu dep zai page</a>
        </li>
      </ul>
    </div>
  );
}
