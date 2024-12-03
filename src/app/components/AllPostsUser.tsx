"use client";
import React, { useState } from 'react';
import { Table, Dropdown, Menu, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Post } from '@/types/AllPosts';
import dynamic from 'next/dynamic';
import DeletePostButton from './DeletePostButton';
import EditPostModal from './EditPostModal';

const AddPost = dynamic(() => import('./AddPost'), {
  ssr: false,
});

interface AllPostsUserProps {
  res: Post[];
}

const AllPostsUser: React.FC<AllPostsUserProps> = ({ res }) => {
  const [posts, setPosts] = useState<Post[]>(res);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const refreshData = () => {
    setPosts([...posts]); // Replace with actual data fetching logic if needed
  };

  const menu = (post: Post) => (
    <Menu>
      <Menu.Item
        key="Edit"
        icon={<EditOutlined />}
        onClick={() => setEditingPost(post)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="Delete">
        <DeletePostButton postId={post.id} onDeleteSuccess={refreshData} />
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Table
        dataSource={posts}
        columns={[
          { title: 'ID', dataIndex: 'id', key: 'id' },
          { title: 'Title', dataIndex: 'title', key: 'title' },
          { title: 'Body', dataIndex: 'body', key: 'body' },
          { title: 'User ID', dataIndex: 'userId', key: 'userId' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Dropdown overlay={menu(record)} trigger={['click']}>
                <Button>Actions</Button>
              </Dropdown>
            ),
          },
        ]}
        rowKey="id"
      />
      <AddPost />
      <EditPostModal
        post={editingPost}
        onClose={() => setEditingPost(null)}
        onUpdateSuccess={refreshData}
      />
    </div>
  );
};

export default AllPostsUser;
