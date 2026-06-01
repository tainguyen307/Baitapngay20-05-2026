import { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Alert } from 'antd';
import { ShoppingOutlined, AppstoreOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import AdminLayout from './AdminLayout';
import { getAdminDashboardStatsApi } from '../../util/adminApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await getAdminDashboardStatsApi();

        if (res) {
          setStats(res);
        } else {
          setError('Failed to fetch dashboard stats');
        }

      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card className="mb-4">
      <Row gutter={16} align="middle">
        <Col span={4}>
          <div className={`text-4xl text-${color}-500`}>{icon}</div>
        </Col>
        <Col span={20}>
          <div className="text-gray-600 text-sm">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </Col>
      </Row>
    </Card>
  );

  return (
    <AdminLayout currentPage="dashboard">
      {loading && <Spin size="large" />}
      
      {error && <Alert message="Error" description={error} type="error" showIcon />}

      {stats && (
        <div>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={<ShoppingOutlined />}
                color="blue"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Categories"
                value={stats.totalCategories}
                icon={<AppstoreOutlined />}
                color="green"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<UserOutlined />}
                color="orange"
              />
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={<ShoppingCartOutlined />}
                color="red"
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-6">
            <Col xs={24} sm={12}>
              <Card title="Delivered Orders">
                <div className="text-3xl font-bold text-green-600">
                  {stats.deliveredOrders}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card title="Total Revenue">
                <div className="text-3xl font-bold text-blue-600">
                  ${(stats?.totalRevenue || 0).toFixed(2)}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
