'use client';

import { BlogModel } from '@/types';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';
import useSWR from 'swr';
import CreateModal from './create.modal';

function AppTable() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Array<BlogModel>>);
  const [showModal, setShowModal] = useState(false);
  const [blog, setBlog] = useState<BlogModel | null>(null);
  const { data, error, isLoading } = useSWR('http://localhost:8000/blogs', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!data || isLoading) {
    return <div>Loading...</div>;
  } else if (!isLoading && (!data || data.length === 0)) {
    return <div>No data</div>;
  }

  const handleButtonEdit = (editBlog: BlogModel) => {
    // blog = data.find((x) => x.id === id) ?? null;
    if (editBlog) {
      setBlog(editBlog);
      setShowModal(true);
    }
  };
  return (
    <>
      <div className="d-flex w-100 justify-content-between my-2">
        <h3>Blog List</h3>
        <Button
          size="sm"
          onClick={() => {
            setShowModal(true);
          }}>
          Add New
        </Button>
      </div>
      <Table
        bordered
        hover
        size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th className="text-center">Title</th>
            <th className="text-center">Author</th>
            <th className="text-center">Setting</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.sort((a, b) => b.id - a.id)
            .map((blog) => {
              return (
                <tr key={blog.id}>
                  <td className="text-center">{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>
                    <div
                      className="d-flex justify-content-center"
                      style={{ gap: '0.25rem' }}>
                      <Button
                        size="sm"
                        style={{ width: '62px' }}
                        onClick={() => handleButtonEdit(blog)}>
                        Edit
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        style={{ width: '62px' }}>
                        View
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ width: '62px' }}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <CreateModal
        showModal={showModal}
        setShowModal={setShowModal}
        editBlog={blog}
        setEditBlog={setBlog}
      />
    </>
  );
}

export default AppTable;
