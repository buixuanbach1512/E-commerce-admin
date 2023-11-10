import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlinePicLeft,
    AiOutlinePicRight,
} from 'react-icons/ai';
import { BiCategory, BiSolidColorFill } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { FaClipboardList } from 'react-icons/fa';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-white text-center fs-5 py-3">
                        <span className="sm-logo">BS</span>
                        <span className="lg-logo">B SHOP</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'signout') {
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className="fs-6" />,
                            label: 'Dash Board',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className="fs-6" />,
                            label: 'Khách Hàng',
                        },
                        {
                            key: 'categories',
                            icon: <BiCategory className="fs-6" />,
                            label: 'Danh Mục',
                            children: [
                                {
                                    key: 'addcategory',
                                    icon: <BiCategory className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listcategory',
                                    icon: <BiCategory className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'products',
                            icon: <AiOutlineShoppingCart className="fs-6" />,
                            label: 'Sản Phẩm',
                            children: [
                                {
                                    key: 'addproduct',
                                    icon: <AiOutlineShoppingCart className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listproduct',
                                    icon: <AiOutlineShoppingCart className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'brands',
                            icon: <SiBrandfolder className="fs-6" />,
                            label: 'Thương Hiệu',
                            children: [
                                {
                                    key: 'addbrand',
                                    icon: <SiBrandfolder className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listbrand',
                                    icon: <SiBrandfolder className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'colors',
                            icon: <BiSolidColorFill className="fs-6" />,
                            label: 'Màu Sắc',
                            children: [
                                {
                                    key: 'addcolor',
                                    icon: <BiSolidColorFill className="fs-6" />,
                                    label: 'Thêm Mới',
                                },
                                {
                                    key: 'listcolor',
                                    icon: <BiSolidColorFill className="fs-6" />,
                                    label: 'Thống Kê',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboardList className="fs-6" />,
                            label: 'Đơn Hàng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-3 align-items-center">
                        <div className="d-flex gap-3 align-items-center">
                            <div>
                                <img style={{ width: '35px', height: '35px' }} src="images/logo.jpg" alt="" />
                            </div>
                            <div>
                                <h5 className="mb-0">Admin</h5>
                                <p className="mb-0">admin@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
