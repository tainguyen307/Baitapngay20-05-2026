import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const AdminLayout = ({ children, currentPage }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/admin'),
    },
    {
      key: 'categories',
      icon: <AppstoreOutlined />,
      label: 'Categories',
      onClick: () => navigate('/admin/categories'),
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: 'Products',
      onClick: () => navigate('/admin/products'),
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
      onClick: () => navigate('/admin/orders'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/admin/users'),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white shadow-md transition-all`}>
        <div className="p-4 border-b">
          <h1 className={`font-bold text-lg ${collapsed ? 'hidden' : 'block'}`}>Admin Panel</h1>
        </div>
        <Menu
          items={menuItems}
          mode="vertical"
          className="border-0"
          selectedKeys={[currentPage]}
        />
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Button
            type="text"
            block
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className={collapsed ? '' : 'text-left'}
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white p-4 border-b shadow-sm">
          <h1 className="text-2xl font-bold capitalize">{currentPage}</h1>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
