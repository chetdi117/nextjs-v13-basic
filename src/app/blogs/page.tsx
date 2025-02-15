import { Metadata } from 'next';
import AppTable from '../components/app.table';
export const metadata: Metadata = {
  title: 'Blogs Page',
  description: 'Blogs page description',
};
const BlogsPage = () => {
  return <AppTable />;
};

export default BlogsPage;
