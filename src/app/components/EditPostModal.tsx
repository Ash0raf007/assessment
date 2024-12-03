import React, { useState } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import { EditPost } from '../api/axios';
import { AxiosError } from 'axios';
import { Post } from '@/types/AllPosts';

interface EditPostModalProps {
  post: Post | null; 
  onClose: () => void; 
  onUpdateSuccess: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, onClose, onUpdateSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      setLoading(true);
      if (post) {
        await EditPost({ id: post.id, title: values.title, body: values.body });
        notification.success({ message: `Post ${post.id} updated successfully` });
        onUpdateSuccess();
      }
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        notification.error({ message: 'Failed to update post', description: errorMessage });
      } else {
        notification.error({ message: 'Failed to update post', description: 'An unexpected error occurred' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Edit Post ${post?.id}`}
      open={!!post}
      onOk={handleUpdate}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Update"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: post?.title, body: post?.body }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: 'Please enter a body!' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPostModal;
