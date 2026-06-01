import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Select, Spin, Alert, Space, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AdminLayout from './AdminLayout';
import {
  getAdminUsersApi,
  updateAdminUserRoleApi,
} from '../../util/adminApi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAdminUsersApi();

      console.log(res);

      if (res && res.success) {
        setUsers(res.data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (record) => {
    setEditingId(record._id);
    form.setFieldsValue({
      role: record.role,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      await updateAdminUserRoleApi(editingId, values);
      setUsers(
        users.map((u) => (u._id === editingId ? { ...u, ...values } : u))
      );
      alert('User role updated successfully');
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      setError(err.message);
    }
  };

  const getRoleTag = (role) => {
    const roleColors = {
      admin: 'red',
      user: 'blue',
    };
    return <Tag color={roleColors[role] || 'default'}>{role}</Tag>;
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 150,
      render: (text) => <span className="text-xs">{text?.slice(0, 8)}...</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => getRoleTag(text),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit Role
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout currentPage="users">
      {error && <Alert message="Error" description={error} type="error" showIcon className="mb-4" />}

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      )}

      <Modal
        title="Edit User Role"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="role"
            label="User Role"
            rules={[{ required: true, message: 'Please select role' }]}
          >
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminUsers;
