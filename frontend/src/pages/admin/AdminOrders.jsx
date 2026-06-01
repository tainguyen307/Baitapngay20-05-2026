import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Select, Spin, Alert, Space, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import AdminLayout from './AdminLayout';
import {
  getAdminOrdersApi,
  updateAdminOrderStatusApi,
} from '../../util/adminApi';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAdminOrdersApi();

      if (res && res.success) {
        setOrders(res.data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEdit = (record) => {
    setEditingId(record._id);
    form.setFieldsValue({
      status: record.status,
      paymentStatus: record.paymentStatus,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    try {
      await updateAdminOrderStatusApi(editingId, values);
      setOrders(
        orders.map((o) => (o._id === editingId ? { ...o, ...values } : o))
      );
      alert('Order updated successfully');
      setIsModalVisible(false);
      form.resetFields();
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      NEW: 'blue',
      CONFIRMED: 'cyan',
      PREPARING: 'orange',
      SHIPPING: 'purple',
      DELIVERED: 'green',
      CANCELLED: 'red',
      CANCEL_REQUESTED: 'volcano',
    };
    return statusColors[status] || 'default';
  };

  const getPaymentStatusColor = (status) => {
    const statusColors = {
      PENDING: 'orange',
      PAID: 'green',
      FAILED: 'red',
    };
    return statusColors[status] || 'default';
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      width: 150,
      render: (text) => <span className="text-xs">{text?.slice(0, 8)}...</span>,
    },
    {
      title: 'Customer',
      dataIndex: ['user', 'name'],
      key: 'customerName',
      width: 150,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <Tag color={getStatusColor(text)}>{text}</Tag>,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text) => <Tag color={getPaymentStatusColor(text)}>{text}</Tag>,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
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
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout currentPage="orders">
      {error && <Alert message="Error" description={error} type="error" showIcon className="mb-4" />}

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      )}

      <Modal
        title="Edit Order Status"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="status"
            label="Order Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Select.Option value="NEW">New</Select.Option>
              <Select.Option value="CONFIRMED">Confirmed</Select.Option>
              <Select.Option value="PREPARING">Preparing</Select.Option>
              <Select.Option value="SHIPPING">Shipping</Select.Option>
              <Select.Option value="DELIVERED">Delivered</Select.Option>
              <Select.Option value="CANCELLED">Cancelled</Select.Option>
              <Select.Option value="CANCEL_REQUESTED">Cancel Requested</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentStatus"
            label="Payment Status"
            rules={[{ required: true, message: 'Please select payment status' }]}
          >
            <Select>
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="PAID">Paid</Select.Option>
              <Select.Option value="FAILED">Failed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminOrders;
