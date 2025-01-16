//use client mục đích giứ lại event của client không phải load 100% component client nó sẻ ném sự kiến xuóng clientç
'use client';

import { useRouter } from 'next/navigation';

const FacebookPageComponent = () => {
  const router = useRouter();
  const handleBtn = () => {
    router.push('/');
  };
  return (
    <div>
      <h1>Facebook Page</h1>
      <button onClick={() => handleBtn()}>Back Home</button>
    </div>
  );
};

export default FacebookPageComponent;
