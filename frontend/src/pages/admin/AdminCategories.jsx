import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Spin, Alert, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminLayout from './AdminLayout';
import {
  getAdminCategoriesApi,
  createAdminCategoryApi,
  updateAdminCategoryApi,
  deleteAdminCategoryApi,
} from '../../util/adminApi';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getAdminCategoriesApi();
      if (Array.isArray(res)) {
        setCategories(res);
      } else if (res?.data) {
        setCategories(res.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    form.setFieldsValue({ name: record.name });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Delete Category',
      content: 'Are you sure you want to delete this category?',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteAdminCategoryApi(id);
          setCategories(categories.filter((c) => c._id !== id));
          alert('Category deleted successfully');
        } catch (err) {
          setError(err.message);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (editingId) {
        await updateAdminCategoryApi(editingId, values);
        setCategories(
          categories.map((c) => (c._id === editingId ? { ...c, ...values } : c))
        );
        alert('Category updated successfully');
      } else {
        const res = await createAdminCategoryApi(values);
        if (res && res.data && res.data.success) {
          setCategories([...categories, res.data.data]);
          alert('Category created successfully');
        }
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 200,
      render: (text) => <span className="text-xs">{text?.slice(0, 8)}...</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout currentPage="categories">
      {error && <Alert message="Error" description={error} type="error" showIcon className="mb-4" />}

      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Category
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={editingId ? 'Edit Category' : 'Add Category'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: 'Please enter category name' },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminCategories;