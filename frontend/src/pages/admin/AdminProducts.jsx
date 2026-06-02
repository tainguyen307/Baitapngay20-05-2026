import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Spin, Alert, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminLayout from './AdminLayout';
import {
  getAdminProductsApi,
  getAdminCategoriesApi,
  createAdminProductApi,
  updateAdminProductApi,
  deleteAdminProductApi,
} from '../../util/adminApi';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsRes, categoriesRes] = await Promise.all([
        getAdminProductsApi(),
        getAdminCategoriesApi(),
      ]);

      console.log("PRODUCTS:", productsRes);
      console.log("CATEGORIES:", categoriesRes);

      if (productsRes?.success) {
        setProducts(productsRes.data);
      }

      if (categoriesRes?.success) {
        setCategories(categoriesRes.data);
      }

    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record._id);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      description: record.description,
      stock: record.stock,
      sold: record.sold,
      category: record.category?._id || record.category,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Delete Product',
      content: 'Are you sure you want to delete this product?',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteAdminProductApi(id);
          setProducts(products.filter((p) => p._id !== id));
          alert('Product deleted successfully');
        } catch (err) {
          setError(err.message);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("stock", values.stock);
      formData.append("sold", values.sold || 0);
      formData.append("category", values.category);

      // images upload
      images.forEach((file) => {
        formData.append("images", file);
      });

      if (editingId) {
        await updateAdminProductApi(editingId, formData);
      } else {
        await createAdminProductApi(formData);
      }

      alert("Success");

      setIsModalVisible(false);
      form.resetFields();
      setImages([]);

      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold',
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
    <AdminLayout currentPage="products">
      {error && <Alert message="Error" description={error} type="error" showIcon className="mb-4" />}

      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Product
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
        />
      )}

      <Modal
        title={editingId ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber min={0} step={0.01} placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock' }]}
          >
            <InputNumber min={0} placeholder="Enter stock" />
          </Form.Item>

          <Form.Item
            name="sold"
            label="Sold"
          >
            <InputNumber min={0} placeholder="Enter sold quantity" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder="Select category">
              {categories.map((cat) => (
                <Select.Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Images">
            <input
              type="file"
              multiple
              onChange={(e) =>
                setImages([...e.target.files])
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminProducts;
