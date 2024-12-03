"use client"
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Modal } from 'antd';
import { AddNewPost } from '../api/axios';
import { AxiosError } from 'axios';

const AddPost: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Ensure the component is rendered only on the client-side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  const onFinish = async (values: { title: string; body: string }) => {
    try {
      const response = await AddNewPost(values);
      notification.success({ message: 'Post added!', description: `ID: ${response.data.id}` });
      form.resetFields();
      setIsModalVisible(false); 
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        notification.error({ message: 'Failed to add post', description: errorMessage });
      } else {
        notification.error({ message: 'Failed to add post', description: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <div>
      <Button 
        type="primary" 
        shape="circle" 
        icon="+" 
        size="large" 
        onClick={() => setIsModalVisible(true)} 
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '80px',
          zIndex: 1000
        }}
      />
      
      <Modal
        title="Add a New Post"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Add Post
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPost;
