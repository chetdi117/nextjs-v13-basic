import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { BlogModel } from '@/types';
import BlogDetailContainer from './blog-container';
import { Metadata, ResolvingMetadata } from 'next';
export interface IBLogDetailProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: IBLogDetailProps, parent: ResolvingMetadata): Promise<Metadata> {
  const [title, id] = (await params).slug;
  const res = await fetch(`http://localhost:8000/blogs/${id}`);
  const blog: BlogModel = await res.json();
  console.log('params:', params);
  return {
    title: blog?.title,
    description: blog?.content,
  };
}

const BlogDetails = async ({ params }: IBLogDetailProps) => {
  const [title, id] = (await params).slug;
  const res = await fetch(`http://localhost:8000/blogs/${id}`);
  const blog: BlogModel = await res.json();
  return <BlogDetailContainer blog={blog} />;
};

export default BlogDetails;
