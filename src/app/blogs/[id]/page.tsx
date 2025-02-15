'use client';

import { useRouter } from 'next/navigation';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import useSWR from 'swr';
import { BlogModel } from '@/types';
interface IBLogDetailProps {
  params: {
    id: string;
  };
}

const BlogDetails = ({ params }: IBLogDetailProps) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<BlogModel>);
  const { data, error, isLoading } = useSWR(`http://localhost:8000/blogs/${params.id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const router = useRouter();
  const handleBtn = () => {
    router.push('/blogs');
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleBtn}
        className="my-2">
        Back
      </Button>
      <Card className="text-center">
        <Card.Header>Title</Card.Header>
        <Card.Body>
          <Card.Title>{data?.title}</Card.Title>
          <Card.Text>{data?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
};

export default BlogDetails;
