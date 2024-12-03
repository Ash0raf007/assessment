import React from 'react';
import { Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deletePost } from '../api/axios';
import { AxiosError } from 'axios';

interface DeletePostButtonProps {
  postId: number;
  onDeleteSuccess: () => void;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await deletePost(postId);
      notification.success({ message: `Post ${postId} deleted successfully` });
      onDeleteSuccess();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        notification.error({ message: 'Failed to delete post', description: errorMessage });
      } else {
        notification.error({ message: 'Failed to delete post', description: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to delete this post?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeletePostButton;
