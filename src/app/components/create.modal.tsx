import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { BlogModel } from '@/types';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
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
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormBlog>({
    defaultValues: defaultBlog,
  });

  useEffect(() => {
    if (editBlog && editBlog.id) {
      setValue('title', editBlog.title);
      setValue('content', editBlog.content);
      setValue('author', editBlog.author);
    } else {
      setValue('title', defaultBlog.title);
      setValue('content', defaultBlog.content);
      setValue('author', defaultBlog.author);
    }
  }, [editBlog]);
  const handleChange = (updateBlog: Partial<IFormBlog>) => {
    if (updateBlog) {
      setForm({ ...form, ...updateBlog });
    }
  };
  const handleSave = (formData: IFormBlog): void => {
    if (editBlog && editBlog.id) {
      updateBlog(formData);
    } else {
      createBlog(formData);
    }
  };

  const triggerSave = (): void => {
    const button = document.getElementById('saveButton');
    if (button) {
      button?.click();
    }
  };

  const handleCloseModal = (): void => {
    // setForm(defaultBlog);
    setEditBlog(null);
    setShowModal(false);
    reset(defaultBlog);
  };
  const createBlog = (data: IFormBlog): void => {
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: data.title, author: data.author, content: data.content }),
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

  const updateBlog = (data: IFormBlog): void => {
    fetch('http://localhost:8000/blogs' + `/${editBlog?.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: data.title, author: data.author, content: data.content }),
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
          <Form onSubmit={handleSubmit(handleSave)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                {...register('title', { required: 'Blog title is required' })}
                isInvalid={Boolean(errors.title)}
              />
              {errors.title && <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                {...register('author', { required: 'Author title is required' })}
                isInvalid={Boolean(errors.author)}
              />
              {errors.author && <Form.Control.Feedback type="invalid">{errors.author.message}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('content', { required: 'Blog content is required' })}
                isInvalid={Boolean(errors.content)}
              />
              {errors.content && <Form.Control.Feedback type="invalid">{errors.content.message}</Form.Control.Feedback>}
            </Form.Group>
            <button
              type="submit"
              id="saveButton"
              className="h-0 w-0 visually-hidden"></button>
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
            onClick={() => triggerSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;
