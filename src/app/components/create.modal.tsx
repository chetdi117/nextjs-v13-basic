import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { BlogModel } from '@/types';
interface ICreateModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  editBlog?: BlogModel | null;
  setEditBlog: (value: BlogModel | null) => void;
}

interface IFormBlog {
  title: string;
  author: string;
  content: string;
}

function CreateModal(props: ICreateModalProps) {
  const { showModal, setShowModal, editBlog, setEditBlog } = props;
  let defaultBlog: IFormBlog = {
    title: '',
    author: '',
    content: '',
  };
  const [form, setForm] = useState(defaultBlog);
  useEffect(() => {
    if (editBlog && editBlog.id) {
      setForm({
        title: editBlog.title,
        content: editBlog.content,
        author: editBlog.author,
      } as IFormBlog);
    } else {
      setForm(defaultBlog);
    }
  }, [editBlog]);
  const handleChange = (updateBlog: Partial<IFormBlog>) => {
    if (updateBlog) {
      setForm({ ...form, ...updateBlog });
    }
  };
  const handleSave = (): void => {
    if (!form.title) {
      toast.error('Please enter title');
      return;
    }

    if (!form.author) {
      toast.error('Please enter author');
      return;
    }

    if (!form.content) {
      toast.error('Please enter content');
      return;
    }

    if (editBlog && editBlog.id) {
      updateBlog();
    } else {
      createBlog();
    }
  };

  const handleCloseModal = (): void => {
    setForm(defaultBlog);
    setEditBlog(null);
    setShowModal(false);
  };
  const createBlog = (): void => {
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: form.title, author: form.author, content: form.content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          mutate('http://localhost:8000/blogs');
          toast.success('Create Blog Success!');
          handleCloseModal();
        }
      });
  };

  const updateBlog = (): void => {
    fetch('http://localhost:8000/blogs' + `/${editBlog?.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: form.title, author: form.author, content: form.content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          mutate('http://localhost:8000/blogs');
          toast.success('Update Blog Success!');
          handleCloseModal();
        }
      });
  };
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => handleCloseModal()}
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {' '}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => handleChange({ title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                value={form.author}
                onChange={(e) => handleChange({ author: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.content}
                onChange={(e) => handleChange({ content: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
