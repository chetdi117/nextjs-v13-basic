'use client';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import useSWR from 'swr';
import { BlogModel } from '@/types';
interface IBLogDetailContainerProps {
  blog: BlogModel;
}

export default function BlogDetailContainer(props: IBLogDetailContainerProps) {
  const { blog } = props;
  const handleBtn = () => {
    window.history.back();
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
          <Card.Title>{blog?.title}</Card.Title>
          <Card.Text>{blog?.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{blog?.author}</Card.Footer>
      </Card>
    </>
  );
}
